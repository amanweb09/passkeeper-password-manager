import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, RootState } from "../types";

const initialState: AuthState = {
    isAuth: false,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        modifyUser(state, action:PayloadAction<AuthState>) {
            state.isAuth = action.payload.isAuth,
                state.user = action.payload.user
        }
    }
})

export const authSelector = (state:RootState) => state.auth
export const { modifyUser } = authSlice.actions
export default authSlice.reducer
