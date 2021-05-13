import { TaskInterface } from './interfaces/task'
import { MulterInterface } from './interfaces/multer'
import { Model } from "mongoose"
import { TaskInterface as TaskModelInterface } from '../interfaces/task'
import { TaskPeriodInterface } from '../interfaces/taskPeriod'
import { Request } from 'express'
import { UserInterface } from '../interfaces/user'
var _ = require("lodash");

const TaskPeriod: Model<TaskPeriodInterface> = require('../models/taskPeriod')
const Task: Model<TaskModelInterface> = require('../models/task')

export default class TaskController implements TaskInterface {
    static IMG_PATH = '/img/tasks'
    static ATC_PATH = '/attachments'
    constructor() {}

    async prepareInputAndSave(req: Request) {
        const input = req.body

        if (!input) {
            throw new Error('Incorrect input!')
        }
    

        const image = (req as MulterInterface).files?.image?.pop();
        const attachment = (req as MulterInterface).files?.attachment?.pop();
        
        input.allocatedBy = (<any>req).userId

        if (image && typeof image === 'object') {
            input.image = TaskController.IMG_PATH + '/' + image.filename
        }
    
        if (attachment && typeof attachment === 'object') {
            input.image = TaskController.ATC_PATH + '/' + attachment.filename
        }

        return await this.newTask(input)
    }

    async newTask(input: TaskModelInterface) {
        const task = new Task(input)

        if (!task) {
            throw new Error ('Could not add task!')
        }

        return await task.save()
    }

    async getTasks(): Promise<any> {

        return new Promise((resolve, reject) => {
            Task.find().populate('period', 'name')
            .then((res) => {
                let groupedByPeriod = _.groupBy(res, function(r: TaskModelInterface) {
                    return r.period._id
                })

                resolve(groupedByPeriod)
            }) 
            .catch(err => {
                reject(err.message)
            })
        })
    }

    async newPeriod(input: TaskPeriodInterface): Promise<TaskPeriodInterface> {
        const taskPeriod = new TaskPeriod(input)
        const newPeriod = await taskPeriod.save()
        
        if (!newPeriod) {
            throw new Error("Cannot add the new period")
        }

        return newPeriod
    }

    async getPeriods(): Promise<any> {
        const periods: {} = await TaskPeriod.find()

        if (!periods) {
            throw new Error('No periods found!')
        }

        return periods
    }
}