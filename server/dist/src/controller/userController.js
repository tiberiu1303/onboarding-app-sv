"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/user');
class UserController {
    constructor() { }
    async getUser() {
        const users = await User.find();
        if (!users) {
            throw new Error('Cannout find any user!');
        }
        return users;
    }
}
exports.default = UserController;
