import { Document } from "mongoose"

export interface TaskAttachmentInterface extends Document {
    taskId: string,
    userId: string,
    attachment: any[],
}