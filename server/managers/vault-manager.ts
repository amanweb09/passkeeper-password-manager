import { Request, Response } from "express";
import dataManager from "./data-manager";
import hashingManager from "./hashing-manager";
import { v4 as uuidv4 } from "uuid"

class VaultManager {

    async storePassword(req: Request, res: Response) {
        const { credentials, masterPassword } = req.body

        if (!credentials || !masterPassword) return res.status(400).json({ message: "Please provide all required fields" })

        // compare password
        if (hashingManager.hashPassword(masterPassword) !== req.user.password) {
            return res.status(400).json({ message: "incorrect password" })
        }

        // // get vault
        let vault;
        try {
            vault = await dataManager.findUserVault("userId", req.user?._id)
        } catch (error) {
            return res.status(500).json({ message: "Server error while finding vault" })
        }

        if (!vault) return res.status(404).json({ message: "Could not find vault for current user" })

        // generate random id for password
        const uid = uuidv4()
        const cred = {
            ...credentials,
            uid
        }

        const encryptionKey = hashingManager.createEncryptionKey(masterPassword)
        if (!vault.vault) {
            const v = [cred]
            const encryptedVault = hashingManager.encryptData(encryptionKey, JSON.stringify(v))
            vault.vault = encryptedVault;
        }
        else {
            const decryptedVault = hashingManager.decryptData(encryptionKey, vault.vault)

            const decVault = JSON.parse(decryptedVault)
            decVault.push(cred)
            const encryptedVault = hashingManager.encryptData(encryptionKey, JSON.stringify(decVault))
            vault.vault = encryptedVault;
        }

        try {
            await vault.save()
            return res.status(200).json({ message: "OK", cred })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server error while finding vault" })
        }
    }

    async getPasswords(req: Request, res: Response) {
        const userId = req.user._id
        const masterPassword = req.body.masterPassword

        if(hashingManager.hashPassword(masterPassword) !== req.user?.password) {
            return res.status(400).json({message: "incorrect password"})
        }

        let vault;
        try {
           vault = await dataManager.findUserVault("userId", userId)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "error while finding vault"})
        }

        if (!vault) return res.status(500).json({message: "no vault exists for this user"})

        const key = hashingManager.createEncryptionKey(masterPassword)
        const decryptedVault = hashingManager.decryptData(key, vault.vault || "")

        if (!decryptedVault) res.status(500).json({message: "error while decrypting vault"})

        return res.status(200).json({
            message: "OK",
            vault: JSON.parse(decryptedVault)
        })
    }
}

export default new VaultManager()