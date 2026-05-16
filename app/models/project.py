from sqlalchemy import Column, Integer, String, DateTime, Enum, Date, func, UUID
from sqlalchemy.orm import relationship
from uuid import uuid4

from app.db.database import Base
from app.enums.project_priority import ProjectPriority
from app.enums.project_status import ProjectStatus


class Project(Base):
    """
    プロジェクトのモデルクラス。
    プロジェクトの基本情報を定義するテーブルを表す。

    Attributes:
        id (int)                   : プロジェクトの一意の識別子
        uuid (UUID)                : プロジェクトのUUID
        title (str)                : プロジェクトのタイトル
        summary (str)              : プロジェクトの概要
        priority (ProjectPriority) : プロジェクトの優先度
        status (ProjectStatus)     : プロジェクトのステータス
        delivery_date (date)       : プロジェクトの納期
        client (str)               : クライアントの名前
        created_at (datetime)      : プロジェクトが作成された日時
        updated_at (datetime)      : プロジェクトが最後に更新された日時
        deleted_at (datetime)      : プロジェクトが削除された日時（論理削除の場合）
    """
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, nullable=False, index=True, autoincrement=True)
    uuid = Column(UUID, default=uuid4(), nullable=False)
    title = Column(String, nullable=False)
    summary = Column(String, nullable=False)
    priority = Column(Enum(ProjectPriority), nullable=False)
    status = Column(Enum(ProjectStatus), nullable=False)
    delivery_date = Column(Date, nullable=True)
    client = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True))

    # 進捗履歴へのリレーション
    process_trackings = relationship("ProcessTracking", back_populates="project")
    # 担当者（中間テーブル）へのリレーション
    project_assignments = relationship("ProjectAssignment", back_populates="project")
