from sqlalchemy import Column, Integer, String, DateTime, Enum, Date, func
from uuid import UUID

from app.db.database import Base
from app.enums.project_priority import ProjectPriority
from app.enums.project_status import ProjectStatus


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, nullable=False, index=True, autoincrement=True)
    uuid = Column(UUID(as_uuid=True), nullable=False)
    title = Column(String, nullable=False)
    summary = Column(String, nullable=False)
    priority = Column(Enum(ProjectPriority), nullable=False)
    status = Column(Enum(ProjectStatus), nullable=False)
    delivery_date = Column(Date, nullable=False)
    client = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True))
