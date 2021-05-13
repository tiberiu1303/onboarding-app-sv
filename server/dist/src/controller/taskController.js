"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
const TaskPeriod = require('../models/taskPeriod');
const Task = require('../models/task');
class TaskController {
    constructor() { }
    async prepareInputAndSave(req) {
        const input = req.body;
        if (!input) {
            throw new Error('Incorrect input!');
        }
        const image = req.files?.image?.pop();
        const attachment = req.files?.attachment?.pop();
        input.allocatedBy = req.userId;
        if (image && typeof image === 'object') {
            input.image = TaskController.IMG_PATH + '/' + image.filename;
        }
        if (attachment && typeof attachment === 'object') {
            input.image = TaskController.ATC_PATH + '/' + attachment.filename;
        }
        return await this.newTask(input);
    }
    async newTask(input) {
        const task = new Task(input);
        if (!task) {
            throw new Error('Could not add task!');
        }
        return await task.save();
    }
    async getTasks() {
        return new Promise((resolve, reject) => {
            Task.find().populate('period', 'name')
                .then((res) => {
                let groupedByPeriod = _.groupBy(res, function (r) {
                    return r.period._id;
                });
                resolve(groupedByPeriod);
            })
                .catch(err => {
                reject(err.message);
            });
        });
    }
    async newPeriod(input) {
        const taskPeriod = new TaskPeriod(input);
        const newPeriod = await taskPeriod.save();
        if (!newPeriod) {
            throw new Error("Cannot add the new period");
        }
        return newPeriod;
    }
    async getPeriods() {
        const periods = await TaskPeriod.find();
        if (!periods) {
            throw new Error('No periods found!');
        }
        return periods;
    }
}
exports.default = TaskController;
TaskController.IMG_PATH = '/img/tasks';
TaskController.ATC_PATH = '/attachments';
