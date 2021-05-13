import { model, Schema, Model } from 'mongoose'
import { TokenInterface } from '../interfaces/token'

const TokenSchema: Schema = new Schema({
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
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
})

const Token: Model<TokenInterface> = model('token', TokenSchema)

module.exports = Token