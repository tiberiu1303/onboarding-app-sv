import { Document } from 'mongoose'

export interface TokenInterface extends Document {
    userId: string,
    name: string,
    device: number
    expired?: boolean,
}