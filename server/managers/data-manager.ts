import { connect } from "mongoose"
import User from "../models/user"
import { User as BaseUser } from "../types"

class DataManager {

    async connection() {
        const CONN_STR = process.env.MONGO_URL || ""

        try {
            await connect(CONN_STR)
            console.log("db connected...")
        } catch (error) {
            console.log(error)
            throw new Error("db connection failed :(")
        }
    }

    async findUser(findBy: "_id" | "email", value: string) {

        if (findBy == "_id") {
            return await User.findById(value)
        }

        return await User.findOne({ email: value })
    }

    async createUser(user:BaseUser) {
        return await User.create(user)
    }

}

export default new DataManager()