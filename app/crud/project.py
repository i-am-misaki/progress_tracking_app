from typing import Optional
from datetime import date, datetime

from app.db.database import SessionLocal
from app.schemas.project import ProjectRegistration, ProjectSummary, ProjectRowUpdate
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
        eta = _convert_to_date(request.eta)

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


async def update_project_row(request: ProjectRowUpdate) -> None:
    """
    案件一覧画面の行更新を行う。

    Args
        request(ProjectRowUpdate) : 案件一覧画面の行更新のリクエストモデル
    """
    db = SessionLocal()
    query_result = (
        db.query(Project)
            .filter(Project.uuid == request.project_uuid)
            .first()
    )
    if not query_result:
        raise ValueError("指定されたUUIDの案件が見つかりませんでした")

    eta: Optional[date] = None
    if request.eta:
        eta = _convert_to_date(request.eta)

    query_result.delivery_date = eta
    query_result.status = request.status
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()


def _convert_to_date(rawEta: Optional[str]) -> Optional[date]:
    """
    文字列で渡されたETAをdatetime.date型に変換する。

    Args
        rawEta(Optional[str]) : 文字列で渡されたETA
    Returns
        Optional[date] : datetime.date型に変換されたETA
    """
    if isinstance(rawEta, str):
        eta = datetime.strptime(rawEta, "%Y-%m-%d").date()
    else:
        eta = rawEta
    return eta
