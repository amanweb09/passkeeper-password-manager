import { config } from "dotenv"
config()

import express from "express"
import router from "./router"
import dataManager from "./managers/data-manager"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"

const app = express()

dataManager.connection()

const STATIC_PATH = path.resolve(__dirname, "./client-build")
app.use(express.static(STATIC_PATH))

const corsOptions:cors.CorsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())
app.get("/", (req, res) => res.sendFile("index.html"))
app.use("/api", router)

const PORT = process.env.PORT || 8001
app.listen(PORT, () => console.log("Server is running on port ", PORT))