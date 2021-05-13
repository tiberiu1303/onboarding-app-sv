"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskPeriodSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Task'
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const TaskPeriod = mongoose_1.model('TaskPeriod', TaskPeriodSchema);
module.exports = TaskPeriod;
