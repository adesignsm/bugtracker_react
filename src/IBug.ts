export interface IBug {

    id: string,
    description: string,
    priority: BugPriority,
    assignee: string
}

export enum BugPriority {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High"
}