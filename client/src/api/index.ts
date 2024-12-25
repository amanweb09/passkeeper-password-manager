import axios from "axios";
import { BaseUser } from "../types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL
const api = axios.create({
    baseURL: BASE_URL || "",
    withCredentials: true
})

export const signup = async (data: BaseUser) => await api.post("/api/signup", data)
export const login = async (data:BaseUser) => await api.post("/api/login", data)

export default api