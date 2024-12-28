import { connect } from "mongoose"
import User from "../models/user"
import { User as BaseUser } from "../types/index"
import Vault from "../models/vault"

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

    async createUser(user: BaseUser) {
        return await User.create(user)
    }

    async initVault(userId: any) {
        return await Vault.create({ userId, vault: "" })
    }

    async findUserVault(findBy: "vaultId" | "userId", id: any) {
        if (findBy == "userId") return await Vault.findOne({ userId: id })
        else return await Vault.findOne({ _id: id })
    }
}

export default new DataManager()