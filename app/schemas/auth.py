from pydantic import BaseModel, EmailStr, ConfigDict
from uuid import UUID


class RegisterRequest(BaseModel):
    """
    ユーザー登録のリクエストモデル。

    Attributes:
        email (EmailStr) : ユーザーのメールアドレス
        password (str)   : ユーザーのパスワード
        name (str)       : ユーザーの名前
    """
    email: EmailStr
    password: str
    name: str


class LoginRequest(BaseModel):
    """
    ログインのリクエストモデル。

    Attributes:
        email (EmailStr) : ユーザーのメールアドレス
        password (str)   : ユーザーのパスワード
    """
    email: EmailStr
    password: str


class PasswordForgetRequest(BaseModel):
    """
    パスワード忘れた場合のリクエストモデル。

    Attributes:
        email (EmailStr) : ユーザーのメールアドレス
    """
    email: EmailStr


class PasswordResetRequest(BaseModel):
    """
    パスワードリセットのリクエストモデル。

    Attributes:
        password (str) : 新しいパスワード
        token (str)    : トークン
    """
    password: str
    token: str


class ActiveUser(BaseModel):
    """
    ユーザー情報

    Attributes:
        uuid (UUID) : ユーザーの uuid
        name (str)  : ユーザー名
    """
    uuid: UUID
    name: str

    model_config = ConfigDict(from_attributes=True)
