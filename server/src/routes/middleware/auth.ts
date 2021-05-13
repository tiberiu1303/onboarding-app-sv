import { Document, Model, model, Types, Schema, Query } from "mongoose"
const User = require ('../../../src/models/user')
import { TokenInterface } from '../../interfaces/token'
const Token: Model<TokenInterface> = require ('../../../src/models/token')
const jwt = require('jsonwebtoken')

const auth = async (req: any, res: { status: Function}, next: Function) => {
    try {
        const token = req.header('Authorization').split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const checkToken = await Token.findOne({name: token})

        if (!checkToken || checkToken.userId != decoded._id) {
            throw new Error ()
        }

        req.token = token
        req.userId = checkToken.userId
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate'})
    }
}

module.exports = auth