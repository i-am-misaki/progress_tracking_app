from fastapi import APIRouter, HTTPException, status

from app.schemas.auth import LoginRequest
from app.crud.auth import get_user_by_email
from app.core.security import verify_password
from app.core.token import create_access_token


router = APIRouter(prefix="/guest", tags=["guest"])


# GETメソッドは不要
# フロントがReactの場合、画面表示はReact(Vite)が担当するため、
# FastAPIがログイン画面用のURLを持つ必要はない。


@router.post("/login")
async def login(request: LoginRequest):
    user = get_user_by_email(request.email)

    # ユーザーが存在しない、またはパスワードが間違っている場合のエラーハンドリング
    if not user or not verify_password(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="メールアドレスまたはパスワードが間違っています。"
        )
    
    # アカウントが無効化されている場合のエラーハンドリング
    if user.disabled:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="このアカウントは無効化されています。"
        )
    
    # アクセストークンの生成
    access_token = create_access_token(data={"sub": str(user.uuid)})
    # 成功時はデフォルトで 200 OK が返る
    return {
        "status_code": "200",
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer"
    }

    