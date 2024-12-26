import { type NextFunction, type Request, type Response } from "express"
import { AuthManager } from "../managers/auth-manager"
import dataManager from "../managers/data-manager"
import { JWTPayload } from "../types"

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const { at } = req.cookies

    if (!at) return res.status(401).json({ message: "unauthorised access" })

    const payload = AuthManager.verifyToken(at) as JWTPayload

    if (!payload) return res.status(401).json({ message: "invalid token" })

    let user;
    try {
        user = await dataManager.findUser("_id", payload._id)
    } catch (error) {
        return res.status(500).json({ message: "server error while finding user" })
    }

    if (!user) return res.status(404).json({ message: "user not found" })

    req.user = user;
    next()
}

export default isAuthenticated