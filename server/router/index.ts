import { Router } from "express"
import authManager from "../managers/auth-manager"
import vaultManager from "../managers/vault-manager"
import isAuthenticated from "../middleware/isAuthenticated"

const router = Router()

router.post("/signup", authManager.signup)
router.post("/signin", authManager.signin)
router.get("/reauth", isAuthenticated, authManager.reAuthenticate)
router.post("/logout", isAuthenticated, authManager.logout)

router.get("/get-passwords", isAuthenticated, vaultManager.getPasswords)
router.post("/store-password", isAuthenticated, vaultManager.storePassword)

export default router