import * as express from "express"
import { MongoUser } from "./types"

declare global {
    namespace Express {
        interface Request {
            user?: MongoUser
        };
    }
}