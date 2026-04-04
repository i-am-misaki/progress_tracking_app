from enum import Enum


class ProjectPriority(str, Enum):
    HIGH = "高"
    MEDIUM = "中"
    LOW = "低"
    