import { Router } from "express"
import authManager from "../managers/auth-manager"
import vaultManager from "../managers/vault-manager"
import isAuthenticated from "../middleware/isAuthenticated"

const router = Router()

router.post("/signup", authManager.signup)
router.post("/signin", authManager.signin)
router.post("/logout", isAuthenticated, authManager.logout)

router.post("/store-password", isAuthenticated, vaultManager.storePassword)

export default router