from fastapi import FastAPI
from backend.settings import Settings

from backend.routers import devices, services
from backend.core.service_monitor import ServiceMonitor
from backend.settings import Settings


settings = Settings()
PREFIX = f"/api/{settings.API_VERSION}"


def lifespan(app: FastAPI):
    app.state.monitor = ServiceMonitor()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(devices.router, prefix=PREFIX)
app.include_router(services.router, prefix=PREFIX)


@app.get(f"{PREFIX}/settings")
async def get_settings():
    return Settings()


def main() -> None:
    print("Hello from backend!")
