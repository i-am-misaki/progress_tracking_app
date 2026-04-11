from pwdlib import PasswordHash

pwd_hash_manager = PasswordHash.recommended()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    平文のパスワードとハッシュ化されたパスワードを照合する。

    Args:
        plain_password (str): 平文のパスワード
        hashed_password (str): ハッシュ化されたパスワード
    Returns:
        bool: 照合結果（True/False）を返す
    """
    return pwd_hash_manager.verify(plain_password, hashed_password)


def convert_to_hashed_password(password: str) -> str:
    """
    平文のパスワードをハッシュ化されたパスワードに変換する。

    Args:
        password (str): 平文のパスワード

    Returns:
        str: ハッシュ化されたパスワード
    """
    return pwd_hash_manager.hash(password)
