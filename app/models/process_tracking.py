from sqlalchemy import Column, String, Integer, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class ProcessTracking(Base):
    __tablename__ = "process_trackings"


    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    content = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True))

    user = relationship("User", back_populates="project_assignments")
    project = relationship("Project", back_populates="project_assignments")
