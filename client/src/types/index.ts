import { ReactNode } from "react"
import store from "../store/store"

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export interface BaseUser {
    name?: string,
    email: string,
    password: string
}

export interface User extends BaseUser {
    _id: string
}

export interface AuthState {
    isAuth: boolean,
    user: User | null
}

export interface BaseJSXProps {
    children: ReactNode
}

export interface UnsavedCredential {
    domain: string,
    username: string,
    password: string,
}

export interface Credentials extends UnsavedCredential {
    uid: string
}

export interface PasswordGeneration {
    credentials: UnsavedCredential,
    masterPassword: string
}