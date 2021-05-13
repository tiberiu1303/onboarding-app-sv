import { Model } from "mongoose"
import { UserInterface } from "../interfaces/user"
const User: Model<UserInterface> = require('../models/user')

export default class UserController {
    constructor() {}

    async getUser(): Promise<{}> {
        const users = await User.find()

        if (!users) {
            throw new Error('Cannout find any user!')
        }

        return users
    }
}