from typing import Annotated

from fastapi import Depends, Request

from backend.core.service_monitor import ServiceMonitor


def service_monitor(request: Request) -> ServiceMonitor:
    return request.app.state.monitor


type MonitorDep = Annotated[ServiceMonitor, Depends(service_monitor)]