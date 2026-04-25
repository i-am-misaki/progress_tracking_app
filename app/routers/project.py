from fastapi import APIRouter

from app.crud.auth import get_users
from app.schemas.auth import ActiveUser


router = APIRouter(prefix="/member", tags=["member"])


@router.get("/users")
async def get_active_users() -> list[ActiveUser]:
    """
    論理削除されていない全てのユーザーを取得する。

    Returns:
        list[ActiveUser] : 抽出したユーザーのリストを返す。
    """
    return await get_users()
