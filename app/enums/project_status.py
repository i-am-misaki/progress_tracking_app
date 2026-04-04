from enum import Enum


class ProjectStatus(str, Enum):
    NOT_STARTED = "未着手"
    IN_PROGRESS = "進行中"
    REVIEWING = "レビュー/確認中"
    COMPLETED = "完了"
    ON_HOLD = "保留/一時停止"
    CANCELLED = "中止"
