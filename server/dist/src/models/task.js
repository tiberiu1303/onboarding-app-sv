"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const task_1 = require("../interfaces/task");
const TaskSchema = new mongoose_1.Schema({
    allocatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    allocatedTo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: task_1.STATUS.PENDING
    },
    period: {
        type: mongoose_1.Schema.Types.ObjectId,
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
});
const Task = mongoose_1.model('Task', TaskSchema);
module.exports = Task;
