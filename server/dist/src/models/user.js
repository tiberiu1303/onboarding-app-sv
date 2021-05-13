"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const app_1 = require("../utils/app");
const jwt = require('jsonwebtoken');
const Token = require("./token");
const bcrypt = require('bcrypt');
const UsersSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    externalId: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
        }
    }
});
UsersSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
    const newToken = new Token({
        userId: this._id,
        name: token,
        device: app_1.getDevice()
    });
    await newToken.save();
    return token;
};
UsersSchema.virtual('tokens', {
    ref: 'Token',
    localField: '_id',
    foreignField: 'userId'
});
UsersSchema.virtual('task', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'allocatedTo'
});
UsersSchema.virtual('task', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'allocatedBy'
});
UsersSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8);
    next();
});
const User = mongoose_1.model('User', UsersSchema);
module.exports = User;
