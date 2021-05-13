"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../../../src/models/user');
const Token = require('../../../src/models/token');
const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const checkToken = await Token.findOne({ name: token });
        if (!checkToken || checkToken.userId != decoded._id) {
            throw new Error();
        }
        req.token = token;
        req.userId = checkToken.userId;
        next();
    }
    catch (e) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};
module.exports = auth;
