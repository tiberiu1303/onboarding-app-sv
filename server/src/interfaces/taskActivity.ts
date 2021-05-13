import { Document } from "mongoose"

export interface TaskActivityInterface extends Document {
    taskId: string,
    userId: string,
    comment: string,
}