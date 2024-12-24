import { config } from "dotenv"
config()

import express from "express"
import router from "./router"
import dataManager from "./managers/data-manager"
import cookieParser from "cookie-parser"
const app = express()

dataManager.connection()

app.use(express.json())
app.use(cookieParser())
app.use("/api", router)

const PORT = process.env.PORT || 8001
app.listen(PORT, () => console.log("Server is running on port ", PORT))