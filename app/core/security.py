from passlib.context import CryptContext

# パスワードのハッシュ化と照合のためのCryptContextを設定
# bcryptアルゴリズムを使用し、古いアルゴリズムは自動的に非推奨とする設定
# poetry add passlib
# poetry add "bcrypt<4.0.0" passlibとの互換性のため、bcryptのバージョンを4.0.0未満に制限
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    平文のパスワードとハッシュ化されたパスワードを照合する。

    Args:
        plain_password (str): 平文のパスワード
        hashed_password (str): ハッシュ化されたパスワード
    Returns:
        bool: 照合結果（True/False）を返す
    """
    return pwd_context.verify(plain_password, hashed_password)


def convert_to_hashed_password(password: str) -> str:
    """
    平文のパスワードをハッシュ化されたパスワードに変換する。

    Args:
        password (str): 平文のパスワード

    Returns:
        str: ハッシュ化されたパスワード
    """
    return pwd_context.hash(password)
