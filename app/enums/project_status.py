from enum import Enum


class ProjectStatus(str, Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    REVIEWING = "reviewing"
    COMPLETED = "completed"
    ON_HOLD = "on_hold"
    CANCELLED = "cancelled"
