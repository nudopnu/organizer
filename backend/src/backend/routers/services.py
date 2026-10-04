from fastapi import APIRouter

from backend.api_deps import MonitorDep


router = APIRouter(prefix="/services", tags=["Service"])


@router.get("/")
async def list_services(monitor: MonitorDep):
    return monitor.get_status()


@router.post("/{service_id}/action/{action}")
def do_action(service_id: str, action: str, monitor: MonitorDep):
    monitor.do_action(service_id, action)