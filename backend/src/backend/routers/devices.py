import yaml
from fastapi import APIRouter
from fastapi.responses import FileResponse

from backend.settings import Settings


settings = Settings()

router = APIRouter(prefix="/devices", tags=["device"])


@router.get("/")
async def list_devices():
    base_path = settings.DATA_PATH / "devices"
    return [yaml.safe_load(p.read_text(encoding="utf8")) for p in base_path.glob("*.yaml")]


@router.get("/media")
async def get_media_file(filename: str):
    path = settings.DATA_PATH / "devices" / filename
    return FileResponse(path)