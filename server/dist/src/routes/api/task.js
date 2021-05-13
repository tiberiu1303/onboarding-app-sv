"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = __importDefault(require("../../controller/taskController"));
const app_1 = require("../../utils/app");
const path = require('path');
const multer = require('multer');
const auth = require('../../routes/middleware/auth');
// Config for routes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const fileExtension = app_1.getFileExtension(file.originalname);
        if (typeof fileExtension === 'string') {
            if (['png', 'jpg', 'jpeg', 'gif'].includes(fileExtension)) {
                cb(null, 'client/public/img/tasks');
            }
            else {
                cb(null, 'client/public/attachments');
            }
        }
    },
    filename: function (req, file, cb) {
        const fileExtension = app_1.getFileExtension(file.originalname);
        cb(null, Date.now() + `.${fileExtension}` ?? '.jpg'); //Appending .jpg
    }
});
var upload = multer({ storage });
const router = express_1.Router();
// Defined Routes
router.get('/task/periods', auth, async (req, res) => {
    const Task = new taskController_1.default();
    try {
        const periods = await Task.getPeriods();
        res.status(201).json(periods);
    }
    catch (e) {
        res.status(404).json({
            message: e.message,
        });
    }
});
router.get('/task', auth, async (req, res) => {
    try {
        const Task = new taskController_1.default();
        const task = await Task.getTasks();
        res.json(task);
    }
    catch (e) {
        res.status(404).json({
            message: e.message,
        });
    }
});
router.post('/task', auth, upload.fields([{ name: 'image' }, { name: 'attachment' }]), async (req, res) => {
    try {
        const task = new taskController_1.default();
        const newTask = await task.prepareInputAndSave(req);
        res.json(newTask);
    }
    catch (e) {
        res.status(400).json({
            message: e.message,
        });
    }
});
router.post('/task/periods', auth, async (req, res) => {
    const input = req.body;
    if (input) {
        const Task = new taskController_1.default();
        try {
            const newTaskPeriod = await Task.newPeriod(input);
            res.status(201).json({
                newTaskPeriod
            });
        }
        catch (e) {
            return res.status(404).json({
                message: e.message,
            });
        }
    }
});
module.exports = router;
