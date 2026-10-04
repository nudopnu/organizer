from fastapi import FastAPI
from backend.settings import Settings

from backend.routers import devices


app = FastAPI()
app.include_router(devices.router)


@app.get("/settings")
async def get_settings():
    return Settings()


def main() -> None:
    print("Hello from backend!")
