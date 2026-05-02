from typing import Optional
from datetime import date

from app.db.database import SessionLocal
from app.schemas.project import ProjectRegistration
from app.models.project import Project
from app.models.user import User
from app.models.project_assignment import ProjectAssignments
from app.models.process_tracking import ProcessTracking
from app.crud.auth import get_user_by_uuid


async def add_project(request: ProjectRegistration) -> None:
    """
    新規案件を追加する。

    Args
        request(ProjectRegistration) : 案件登録登録スチーマクラス
    """
    db = SessionLocal()

    # ETA の型を datetime.date 型に変換
    eta: Optional[date] = None
    if request.eta:
        eta = request.eta.strptime("%Y-%m-%d")

    # 案件登録
    new_project = Project(
        title=request.project_name,
        summary=request.project_summary,
        priority=request.priority,
        status=request.status,
        delivery_date=eta,
        client=request.client
    )
    db.add(new_project)
    db.flush()

    # 案件担当者情報の登録
    project_pic = db.query(User).filter(User.uuid == request.pic).first()
    if project_pic:
        new_assignment = ProjectAssignments(
            project_id=new_project.id,
            user_id=project_pic.id
        )
        db.add(new_assignment)

    # 進捗登録
    if request.progress:
        new_process = ProcessTracking(
            content=request.progress,
            project_id=new_process.id,
            # ログインユーザーのIDを格納
            user_id=1
        )
        db.add(new_process)

    try:
        db.commit()
        db.refresh(new_project)
        return new_project
    except Exception as e:
        db.rollback()
        raise e

