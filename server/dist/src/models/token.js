"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TokenSchema = new mongoose_1.Schema({
    userId: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Token"
    },
    name: {
        required: true,
        type: String
    },
    device: {
        required: true,
        type: Number
    },
    expired: {
        required: true,
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
const Token = mongoose_1.model('token', TokenSchema);
module.exports = Token;
