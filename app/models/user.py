from sqlalchemy import Column, Integer, String, DateTime, func, UUID, Boolean
from sqlalchemy.orm import relationship
from uuid import uuid4

from app.db.database import Base


class User(Base):
    """
    ユーザーモデルクラス。
    ユーザーの基本情報を定義するテーブルを表す。

    Attributes:
        id (int)              : ユーザーの一意の識別子
        uuid (UUID)           : ユーザーのUUID
        name (str)           : ユーザーの名前
        email (str)          : ユーザーのメールアドレス
        password (str)       : ユーザーのパスワード
        disabled (bool)      : ユーザーが無効化されているかどうか
        created_at (datetime) : ユーザーが作成された日時
        updated_at (datetime) : ユーザーが最後に更新された日時
        deleted_at (datetime) : ユーザーが削除された日時（論理削除の場合）
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False, index=True, autoincrement=True)
    uuid = Column(UUID, default=uuid4(), nullable=False)
    name = Column(String, nullable=False)
    email = Column(String(245), unique=True, nullable=False)
    password = Column(String, nullable=False)
    disabled = Column(Boolean, default=False, nullable=False, server_default="false")
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True))

    project_assignments = relationship("ProjectAssignment", back_populates="user")
