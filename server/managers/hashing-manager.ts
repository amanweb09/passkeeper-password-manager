import crypto from "crypto"
import Cryptr from "cryptr";

class HashingManager {

    hashPassword(text: string) {
        return crypto.createHash("sha256").update(text).digest("hex")
    }

    createEncryptionKey(password: string) {
        return crypto.createHash("sha256").update(password).digest("hex")
    }

    encryptData(key:string, data:string) {
        const cryptr = new Cryptr(key)

        return cryptr.encrypt(data)
    }

    decryptData(key:string, data:string) {
        const cryptr = new Cryptr(key)

        return cryptr.decrypt(data)
    }

}

export default new HashingManager()