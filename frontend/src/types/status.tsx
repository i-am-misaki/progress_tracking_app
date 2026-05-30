
export const ProjectStatus = {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    ON_HOLD: 'on_hold',
    CANCELLED: 'cancelled'
} as const;

export type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus];

export const ProjectStatusList = Object.values(ProjectStatus);
