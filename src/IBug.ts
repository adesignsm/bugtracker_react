export interface IBug {
    id: string,
    description: string,
    priority: BugPriority,
    assignee: string,
    color: string
}

export enum BugPriority {
    DEFAULT = "Select a level",
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
}