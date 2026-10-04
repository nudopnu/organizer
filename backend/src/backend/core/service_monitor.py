import time
import uuid
from threading import Thread

import yaml
from httpx import Client

from backend.generated.models import Service, ServiceSummary, Operation, Assertion, Status, JsonFromHttpAssertion
from backend.settings import Settings


cfg = Settings()


class ServiceMonitor:

    def __init__(self):
        services_path = cfg.DATA_PATH / "services"
        self.services: dict[str, Service] = {}
        self.status: dict[str, ServiceSummary] = {}
        self.threads: dict[str, Thread] = {}
        for services_path in services_path.glob("*.yaml"):
            content = services_path.read_text(encoding="utf8")
            raw = yaml.safe_load(content)
            service = Service.model_validate(raw)

            id = str(uuid.uuid4())
            self.services[id] = service

            thread = Thread(target=lambda _id=id: self.check(_id), daemon=True)
            thread.start()
            self.threads[id] = thread

    def get_status(self):
        return [status for status in self.status.values()]

    def get_service(self, id: str):
        try:
            return self.services[id]
        except KeyError:
            raise Exception(f"Service with id '{id}' does not exist")

    def do_action(self, service_id: str, action: str):
        client = Client()
        service = self.get_service(service_id)
        if action not in service.actions:
            raise Exception(f"Service {service.name} has no action '{action}'")
        for step in service.actions[action]:
            if step.delay:
                time.sleep(step.delay / 1000)
            client.request(
                url=step.url,
                method=step.method,
            )


    def check(self, id: str):
        service = self.services[id]
        with Client() as client:
            while True:
                try:
                    status = self.service_status(service, client)
                except Exception:
                    status = Status.down
                self.status[id] = ServiceSummary(
                    id=id,
                    name=service.name, 
                    description=service.description, 
                    status=status,
                    actions=[a for a in service.actions],
                )
                time.sleep(service.checks.interval)

    def service_status(self, service: Service, client: Client) -> Status:
        up_assertion = service.checks.up
        starting_assertion = service.checks.startings
        if self.check_assertion(up_assertion, client):
            return Status.up
        if starting_assertion and self.check_assertion(starting_assertion, client):
            return Status.starting
        return Status.down

    def check_assertion(self, assertion: Assertion, client: Client):
        match assertion:
            case JsonFromHttpAssertion():
                assertion
                value = client.request(
                    method=assertion.method,
                    url=assertion.url,
                ).json()
                path_parts = assertion.path.split(".")
                for part in path_parts:
                    value = value[part]
                if assertion.operation == Operation.eq:
                    return value == assertion.value
                if assertion.operation == Operation.ne:
                    return value != assertion.value