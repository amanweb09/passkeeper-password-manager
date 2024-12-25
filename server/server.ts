import { config } from "dotenv"
config()

import express from "express"
import router from "./router"
import dataManager from "./managers/data-manager"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

dataManager.connection()

const corsOptions:cors.CorsOptions = {
    origin: ["http://localhost:5713"],
    credentials: true
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())
app.use("/api", router)

const PORT = process.env.PORT || 8001
app.listen(PORT, () => console.log("Server is running on port ", PORT))