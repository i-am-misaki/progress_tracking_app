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


async def get_projects() -> list[Project]:
    """
    projects テーブルから下記の条件に一致するレコードデータを全て取得する
    ・ deleted_at が null
    ・ status が COMPLETED ではないもの

    Returns
        list[Project] : 抽出したレコードリストを返す
    """
    db = SessionLocal()
    query_results = (
        db.query(Project)
            .filter(Project.deleted_at == None, Project.status != "COMPLETED")
            .all()
    )

    project_list: list = []
    for p in query_results:
        latest_track = None
        if p.process_trackings:
            latest_track = sorted(p.process_trackings, key=lambda x: x.id, reverse=True)[0]

        pic_user = p.project_assign[0].user.name if p.project_assign else ""

        p_model = Project(
            project_uuid=p.project.uuid,
            project_name=p.project_name,
            client=p.client,
            eta=p.delivery_date.strftime("%Y%m%d") if p.delivery_date else "",
            pic=pic_user.uuid,
            status=p.status,
            latest_progress=latest_track.progress_content if latest_track else ""
        )
        project_list.append(p_model)
    return project_list
