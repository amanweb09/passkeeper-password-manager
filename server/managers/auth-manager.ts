import { Request, Response } from "express";
import dataManager from "./data-manager";
import hashingManager from "./hashing-manager";
import jwt from "jsonwebtoken"

class AuthManager {

    async signup(req: Request, res: Response) {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "please fill all the fields" })
        }

        let existingUser;
        try {
            existingUser = await dataManager.findUser("email", email)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "server error while finding user" })
        }

        if (existingUser) return res.status(400).json({ message: "user already exists with this email" })

        const hashedPassword = hashingManager.hashPassword(password)

        const u = { name, email, password: hashedPassword }

        let user;
        try {
            user = await dataManager.createUser(u)
        } catch (error) {
            return res.status(500).json({ message: "server error while creating user" })
        }

        const token = AuthManager.generateToken({ _id: user._id })

        res.cookie("at", token)
        return res.status(201).json({ message: "OK", user })
    }

    async signin(req: Request, res: Response) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "please fill all the fields" })
        }

        let user;
        try {
            user = await dataManager.findUser("email", email)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "server error while finding user" })
        }

        if (!user) return res.status(404).json({ message: "no user exists with this email. Please signin" })

        const hashedPassword = hashingManager.hashPassword(password)

        if (user.password !== hashedPassword) return res.status(400).json({ message: "invalid credentials" })

        const token = AuthManager.generateToken({ _id: user._id })

        res.cookie("at", token)
        return res.status(200).json({ message: "OK", user })
    }

    async logout(req: Request, res: Response) {
        res.clearCookie("at")
        return res.status(200).json({ message: "OK" })
    }

    static generateToken(payload: any) {
        const SECRET = process.env.JWT_SECRET || ""
        return jwt.sign(payload, SECRET, {
            expiresIn: 1000 * 60 * 60 * 24 * 3
        })
    }

    static verifyToken(token: string) {
        const SECRET = process.env.JWT_SECRET || ""
        return jwt.verify(token, SECRET)
    }
}

export default new AuthManager()