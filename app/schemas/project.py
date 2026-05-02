from pydantic import BaseModel
from typing import Optional
from uuid import UUID

from app.enums.project_priority import ProjectPriority
from app.enums.project_status import ProjectStatus


class ProjectRegistration(BaseModel):
    """
    案件登録のリクエストモデル。

    Attributes
        project_name(str)         : 案件名
        project_summary(str)      : 案件概要
        client(str)               : 依頼元
        eta(Optional[str])        : 納期
        status(ProjectStatus)     : 進捗状態
        priority(ProjectPriority) : 優先度
        pic(Optional[UUID])       : 担当者の UUID
        progress(Optional[str])   : 進捗内容
    """
    project_name: str
    project_summary: str
    client: str
    eta: Optional[str]
    pic: Optional[UUID]
    status: ProjectStatus
    priority: ProjectPriority
    progress: Optional[str]
