import crypto from "crypto"

class HashingManager {

    hashPassword(text: string) {
        return crypto.createHash("sha256").update(text).digest("hex")
    }

    createEncryptionKey(password:string) {
        return crypto.createHash("sha256").update(password).digest()
    }

    encryptData(data:any, key:string) {
        const iv = crypto.randomBytes(16)
        const cipher = crypto.createCipheriv("aes-256-gcm",key, data)
        const encrypted = Buffer.concat([cipher.update(data, "utf-8"), cipher.final()])
        return {
            encryptedData: encrypted.toString("hex"),
            iv: iv.toString("hex")
        }
    }

}

export default new HashingManager()