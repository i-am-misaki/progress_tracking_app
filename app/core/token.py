from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from app.core.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """
    JWTアクセストークンを作成する関数。
    
    Args:
        data (dict)                      : トークンのペイロードに含めるデータ。
        expires_delta (timedelta | None) : トークンの有効期限。Noneの場合、トークンは15分で期限切れになる。
    Returns:
        str: エンコードされたJWTアクセストークン。
    """
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=15)
    to_encode.update({
        "expires_delta": ACCESS_TOKEN_EXPIRE_MINUTES,
        "exp": expire
    })
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Annotated[str, Depends(OAuth2PasswordBearer(tokenUrl="token"))]) -> dict:
    """
    JWTアクセストークンから現在のユーザーを取得する関数。
    
    Args:
        token(str): クライアントから送信されたJWTアクセストークン。
    Returns:
        dict: トークンのペイロードに含まれるユーザーデータ。
    Raises:
        HTTPException: トークンが無効な場合や期限切れの場合に発生。
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_uuid: str = payload.get("sub")
        if user_uuid is None:
            raise credentials_exception
        return payload
    except InvalidTokenError:
        raise credentials_exception
