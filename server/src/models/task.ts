import { model, Schema, Document, Model } from "mongoose"
import { TaskInterface, STATUS } from "../interfaces/task"

const TaskSchema: Schema = new Schema({
    allocatedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    allocatedTo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: STATUS.PENDING
    },
    period: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'TaskPeriod'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    attachment: {
        type: String,
    },
    active: {
        type: String,
        default: 1
    },
}, {
    timestamps: true
}) 


const Task: Model<TaskInterface> = model('Task', TaskSchema)

module.exports = Task