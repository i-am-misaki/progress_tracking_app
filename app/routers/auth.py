from fastapi import APIRouter, HTTPException, status

from app.schemas.auth import LoginRequest


router = APIRouter(prefix="/guest", tags=["guest"])


# GETメソッドは不要
# フロントがReactの場合、画面表示はReact(Vite)が担当するため、
# FastAPIがログイン画面用のURLを持つ必要はない。


@router.post("/login")
async def login(request: LoginRequest):
    # 本来はここでDBをチェックする
    if request.email == "test@example.com" and request.password == "password":
        # 成功時はデフォルトで 200 OK が返る
        return {
            "status_code": "200",
            "message": "Login successful",
            "access_token": "dummy-token-12345",
            "token_type": "bearer"
        }
    else:
        # 失敗時は「例外(HTTPException)」を投げる
        # これにより、HTTPヘッダーのステータスコード自体が 401 になる
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="メールアドレスまたはパスワードが間違っています。"
        )
    