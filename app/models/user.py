from sqlalchemy import Column, Integer, String, DateTime, func, UUID, Boolean
from uuid import uuid4

from app.db.database import Base


class User(Base):
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

