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



class ProjectSummary(BaseModel):
    """
    案件一覧画面に表示する案件情報モデル

    Attributes
        project_uuid(UUID)    : 案件の UUID
        project_name(str)     : 案件名
        client(str)           : 依頼元
        eta(str)              : 納期
        pic(Optional[UUID])   : 担当者
        status(ProjectStatus) : 進捗状態
        latest_progress(str)  : 最新の進捗
    """
    project_uuid: Optional[UUID]
    project_name: str
    client: str
    eta: str
    pic: Optional[UUID]
    status: ProjectStatus
    latest_progress: str


class ProjectRowUpdate(BaseModel):
    """
    案件一覧画面の行更新のリクエストモデル

    Attributes
        project_uuid(UUID)    : 案件の UUID
        eta(str)              : 納期
        status(ProjectStatus) : 進捗状態
    """
    project_uuid: UUID
    eta: str
    status: ProjectStatus
