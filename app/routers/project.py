from fastapi import APIRouter

from app.crud.auth import get_users
from app.crud.project import add_project, get_projects, update_project_row
from app.schemas.auth import ActiveUser
from app.schemas.project import ProjectRegistration, ProjectSummary, ProjectRowUpdate


router = APIRouter(prefix="/member", tags=["member"])


@router.get("/users")
async def get_active_users() -> list[ActiveUser]:
    """
    論理削除されていない全てのユーザーを取得する。

    Returns:
        list[ActiveUser] : 抽出したユーザーのリストを返す。
    """
    return await get_users()


@router.get("/projects")
async def get_active_projects() -> list[ProjectSummary]:
    """
    論理削除されていない、ステータスが完了以外の案件情報を全て取得する。

    Returns
        list[Project] : 抽出した案件のリストを返す。
    """
    return await get_projects()


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


@router.put("/project/update/row")
async def project_row_update(request: ProjectRowUpdate):
    """
    案件一覧画面の行更新を行う。
    """
    await update_project_row(request)
    return {
        "status_code": "200",
        "message": "Project row update successful"
    }
