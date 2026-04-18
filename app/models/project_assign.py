from sqlalchemy import Column, Integer, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class ProjectAssignments(Base):
    """
    プロジェクト割り当てのモデルクラス。
    ユーザーがプロジェクトに割り当てられる関係を定義するテーブルを表す。

    Attributes:
        id (int)              : プロジェクト割り当ての一意の識別子
        user_id (int)         : 割り当てられたユーザーのID
        project_id (int)      : 割り当てられたプロジェクトのID
        created_at (datetime) : 割り当てが作成された日時
        updated_at (datetime) : 割り当てが最後に更新された日時
        deleted_at (datetime) : 割り当てが削除された日時（論理削除の場合）
    """
    __tablename__ = "project_assignments"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True))


    user = relationship("User", back_populates="project_assignments")
    project = relationship("Project", back_populates="project_assignments")
