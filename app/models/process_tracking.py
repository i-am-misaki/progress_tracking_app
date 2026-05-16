from sqlalchemy import Column, String, Integer, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class ProcessTracking(Base):
    """
    進捗管理のモデルクラス。
    ユーザーの進捗を追跡するためのテーブルを定義する。

    Attributes:
        id (int)              : プロセストラッキングの一意の識別子
        content (str)         : 進捗の内容
        user_id (int)         : 進捗を記録したユーザーのID
        project_id (int)      : 進捗が関連するプロジェクトのID
        created_at (datetime) : 進捗が作成された日時
        updated_at (datetime) : 進捗が最後に更新された日時
        deleted_at (datetime) : 進捗が削除された日時（論理削除の場合）
    """
    __tablename__ = "process_trackings"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    content = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True))

    user = relationship("User")
    project = relationship("Project", back_populates="process_trackings")
