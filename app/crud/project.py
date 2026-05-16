from typing import Optional
from datetime import date, datetime

from app.db.database import SessionLocal
from app.schemas.project import ProjectRegistration, ProjectSummary
from app.models.project import Project
from app.models.user import User
from app.models.project_assignment import ProjectAssignment
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
        if isinstance(request.eta, str):
            eta = datetime.strptime(request.eta, "%Y-%m-%d").date()
        else:
            eta = request.eta

    # 案件登録
    new_project = ProjectRegistration(
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
        new_assignment = ProjectAssignment(
            project_id=new_project.id,
            user_id=project_pic.id
        )
        db.add(new_assignment)

    # 進捗登録
    if request.progress:
        new_process = ProcessTracking(
            content=request.progress,
            project_id=new_project.id,
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
        # 進捗の取得
        latest_track = None
        if p.process_trackings:
            latest_track = sorted(p.process_trackings, key=lambda x: x.id, reverse=True)[0]

        # 担当者(User)の取得
        assigned_user = None
        if p.project_assignments and p.project_assignments[0].user:
            assigned_user = p.project_assignments[0].user

        p_model = ProjectSummary(
            project_uuid=p.uuid,
            project_name=p.title,
            client=p.client,
            # 日付のフォーマット
            eta=f"{p.delivery_date.year}/{p.delivery_date.month}/{p.delivery_date.day}" if p.delivery_date else "",
            # Userオブジェクトがあればそのuuidを、なければ空文字を入れる
            pic=assigned_user.uuid if assigned_user else None,
            status=p.status,
            latest_progress=latest_track.progress_content if latest_track else ""
        )
        project_list.append(p_model)

    db.close() # セッションを閉じるのを忘れずに
    return project_list
