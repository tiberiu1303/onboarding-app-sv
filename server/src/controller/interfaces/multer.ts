import { Request } from "express"

export interface MulterInterface extends Request {
    files: {
        image: [
            {
                destination: string,
                filename: string
            }
        ],
        attachment: [
            {
                destination: string,
                filename: string
            }
        ]
    },
}