import { Document } from "mongoose"
import { TaskPeriodInterface } from "../interfaces/taskPeriod"
export enum STATUS {'ACTIV', 'INACTIV', 'PENDING', 'COMPLETED'}

export interface TaskInterface extends Document {
    allocatedBy: string,
    allocatedTo: string | number,
    status: string,
    period: TaskPeriodInterface,
    title: string,
    description: string,
    image?: string,
    attachment?: string,
    active: number
}

