from fastapi import APIRouter

from app.crud.auth import get_users
from app.crud.project import add_project
from app.schemas.auth import ActiveUser
from app.schemas.project import ProjectRegistration


router = APIRouter(prefix="/member", tags=["member"])


@router.get("/users")
async def get_active_users() -> list[ActiveUser]:
    """
    論理削除されていない全てのユーザーを取得する。

    Returns:
        list[ActiveUser] : 抽出したユーザーのリストを返す。
    """
    return await get_users()


@router.post("/project/register")
async def project_registration(request: ProjectRegistration):
    """
    案件の登録を行う。
    """
    await add_project(request)
    return {
        "status_code": "200",
        "message": "Project registration successful"
    }
