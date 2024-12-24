import { Router } from "express"
import authManager from "../managers/auth-manager"

const router = Router()

router.post("/signup", authManager.signup)
router.post("/signin", authManager.signin)
router.post("/logout", authManager.logout)

export default router