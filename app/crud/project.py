from app.db.database import SessionLocal

from app.schemas.project import ProjectRegistration
from app.models.project import Project


async def add_project(request: ProjectRegistration) -> None:
    """
    新規案件を追加する。

    Args
        request(ProjectRegistration) : 案件登録登録スチーマクラス
    """
    db = SessionLocal()
    new_project = Project(
        title=request.project_name,
        summary=request.project_summary,
        priority=request.priority,
        status=request.status,
        delivery_date=request.eta,
        client=request.client,
        pic=request.pic,
        progress=request.progress
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)

