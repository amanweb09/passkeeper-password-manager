import { Request, Response } from "express";
import dataManager from "./data-manager";
import hashingManager from "./hashing-manager";

class VaultManager {

    async storePassword(req: Request, res: Response) {
        const { credentials, masterPassword } = req.body

        if (!credentials || !masterPassword) return res.status(400).json({ message: "Please provide all required fields" })

        // find user
        const userId = req.user?._id || ""

        let user;
        try {
            user = await dataManager.findUser("_id", userId)
        } catch (error) {
            return res.status(500).json({ message: "Server error while finding user" })
        }

        if (!user) return res.status(404).json({ message: "No user found" })

        // check master password
        if (user.password !== hashingManager.hashPassword(masterPassword)) {
            return res.status(401).json({ message: "Invalid master password" })
        }

        // get vault
        let vault;
        try {
            vault = await dataManager.findUserVault("userId", req.user?._id)
        } catch (error) {
            return res.status(500).json({ message: "Server error while finding vault" })
        }

        if (!vault) return res.status(404).json({ message: "Could not find vault for current user" })

        console.log("vault", vault);
        res.send("OK")
        // encrypt vault
        // const encryptionKey = hashingManager.createEncryptionKey(masterPassword)
        // hashingManager.encryptData()
        // update vault
    }

}

export default new VaultManager()