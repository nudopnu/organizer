from fastapi import FastAPI
from backend.settings import Settings

from backend.routers import devices, services
from backend.core.service_monitor import ServiceMonitor


def lifespan(app: FastAPI):
    app.state.monitor = ServiceMonitor()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(devices.router)
app.include_router(services.router)


@app.get("/settings")
async def get_settings():
    return Settings()


def main() -> None:
    print("Hello from backend!")
