from app.db.database import SessionLocal
from app.models.user import User


def get_user_by_email(email: str) -> User:
    """
    メールアドレスを使用してユーザーを取得する。
    
    Args:
        email (str): ユーザーのメールアドレス
    Returns:
        User: ユーザーの情報（存在しない場合は None）
    """
    db = SessionLocal()
    return db.query(User).filter(User.email == email, User.deleted_at == None).first()
