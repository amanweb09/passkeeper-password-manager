import axios from "axios";
import { BaseUser, PasswordGeneration } from "../types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL
const api = axios.create({
    baseURL: BASE_URL || "",
    withCredentials: true
})

export const signup = async (data: BaseUser) => await api.post("/api/signup", data)
export const login = async (data:BaseUser) => await api.post("/api/signin", data)
export const reauth = async () => await api.get("/api/reauth")

export const getPasswords = async () => await api.get("/api/get-passwords")
export const storePassword = async (data:PasswordGeneration) => await api.post("/api/store-password", data)

export default api