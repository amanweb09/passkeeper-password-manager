import crypto from "crypto"

class HashingManager {

    hashPassword(text: string) {
        return crypto.hash("sha256", text, "hex")
    }
}

export default new HashingManager()