import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginApi, Token } from "../../api/service/auth";


export type AuthState = {
    authToken: string;
}

const initialState: AuthState = {
    authToken: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.authToken = action.payload;
        },
        clear(state) {
            state.authToken = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(loginApi.endpoints.login.matchFulfilled, (state, action: PayloadAction<Token>) => {
                state.authToken = action.payload.token;
            })
    }
})


export default authSlice.reducer;