from fastapi import APIRouter, HTTPException, status

from app.schemas.auth import LoginRequest, PasswordForgetRequest, PasswordResetRequest, RegisterRequest
from app.crud.auth import get_user_by_email, update_user_password, create_user
from app.core.security import verify_password, convert_to_hashed_password
from app.core.token import create_access_token, create_password_reset_token, get_current_user
from app.core.config import PASSWORD_RESET_SECRET_KEY


router = APIRouter(prefix="/guest", tags=["guest"])


# GETメソッドは不要
# フロントがReactの場合、画面表示はReact(Vite)が担当するため、
# FastAPIがログイン画面用のURLを持つ必要はない。

@router.post("/signup")
async def signup(request: RegisterRequest):
    hashed_password = convert_to_hashed_password(request.password.strip())
    await create_user(request.email.strip(),
                    hashed_password,
                    request.name.strip())
    return {
        "status_code": "200",
        "message": "Signup successful"
    }


@router.post("/login")
async def login(request: LoginRequest):
    user = await get_user_by_email(request.email.strip())

    # ユーザーが存在しない、またはパスワードが間違っている場合のエラーハンドリング
    if not user or not verify_password(request.password, user.password):
        return {
            "status_code": "401",
            "message": "Email or password is incorrect."
        }

    # アカウントが無効化されている場合のエラーハンドリング
    if user.disabled:
        return {
            "status_code": "403",
            "message": "This account has been disabled."
        }

    # アクセストークンの生成
    access_token = create_access_token(data={"sub": str(user.uuid)})
    # 成功時はデフォルトで 200 OK が返る
    return {
        "status_code": "200",
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer"
    }



@router.post("/password_forget")
async def forget_password(request: PasswordForgetRequest):
    user = await get_user_by_email(request.email.strip())
    if not user:
        return {
            "status_code": "404",
            "message": "Reset email has been sent to the email address."
        }

    token = create_password_reset_token(email=request.email)
    # パスワードリセットのメール送信処理はここで行う
    # ここではトークンを生成するだけにとどめ、実際のメール送信は実装しない。
    return {
        "status_code": "200",
        "message": "Reset email has been sent to the email address.",
        "reset_token": token  # デバッグ用にトークンを返す（本番環境ではセキュリティ上の理由から返さない方が良い）
    }


@router.post("/password_resetting")
async def reset_password(request: PasswordResetRequest):
    """
    パスワードリセットの処理を行うエンドポイント。
    フロントエンドから新しいパスワードを受け取り、ユーザーのパスワードを更新する。

    Args:
        request (PasswordResetRequest): パスワードリセットのリクエストデータ（新しいパスワード）
    Returns:
        dict: パスワードリセットの結果を含むレスポンス
    """
    # トークンの検証とメールアドレスの取得
    payload = await get_current_user(PASSWORD_RESET_SECRET_KEY, request.token)  # トークンの有効性を確認し、ユーザー情報を取得する（例外が発生する場合は無効なトークン）
    user_email = payload.get("sub")
    if not user_email:
        return {
            "status_code": "400",
            "message": "It's an invalid token."
        }
    user = await get_user_by_email(user_email)
    if not user:
        return {
            "status_code": "404",
            "message": "Failed to reset password."
        }
    update_user_password(user, request.password)
    return {
        "status_code": "200",
        "message": "Password has been reset successful."
    }
