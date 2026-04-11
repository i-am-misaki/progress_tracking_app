from fastapi import APIRouter, HTTPException, status

from app.schemas.auth import LoginRequest
from app.crud.auth import get_user_by_email
from app.core.security import verify_password


router = APIRouter(prefix="/guest", tags=["guest"])


# GETメソッドは不要
# フロントがReactの場合、画面表示はReact(Vite)が担当するため、
# FastAPIがログイン画面用のURLを持つ必要はない。


@router.post("/login")
async def login(request: LoginRequest):
    user = get_user_by_email(request.email)
    if not user or not verify_password(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="メールアドレスまたはパスワードが間違っています。"
        )
    
    # 成功時はデフォルトで 200 OK が返る
    # トークンの生成はここで行う
    return {
        "status_code": "200",
        "message": "Login successful",
        "access_token": "dummy-token-12345",
        "token_type": "bearer"
    }

    