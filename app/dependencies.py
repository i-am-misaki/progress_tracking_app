from app.db.database import SessionLocal


def get_db():
    """
    データベースセッションを取得するための依存関数。
    FastAPIの依存注入システムを使用して、エンドポイントでデータベースセッションを利用できるようにする。

    Yields:
        Session: データベースセッション
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
