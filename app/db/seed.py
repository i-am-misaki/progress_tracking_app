import uuid

from app.models.user import User
from app.core.security import convert_to_hashed_password
from app.db.database import SessionLocal


def seed():
    db = SessionLocal()
    
    test_email = "test@example.com"
    existing_user = db.query(User).filter(User.email == test_email).first()
    if existing_user:
        print(f"ユーザー {test_email} は既に存在しています。")
        db.close()
        return  
    
    hashed_password = convert_to_hashed_password("password")
    # print(f"ハッシュ化されたパスワード: {hashed_password}")
    # サンプルユーザーの作成
    sample_user = User(
        uuid=uuid.uuid4(),
        name="Test User",
        email="test@example.com",
        password=hashed_password,
        disabled=False
    )
    db.add(sample_user)
    db.commit() 
    db.close()


if __name__ == "__main__":
    seed()
    