import { model, Schema, Model, Document } from "mongoose"
import { TaskPeriodInterface } from "../interfaces/taskPeriod"

const TaskPeriodSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const TaskPeriod: Model<TaskPeriodInterface> = model('TaskPeriod', TaskPeriodSchema)

module.exports = TaskPeriod