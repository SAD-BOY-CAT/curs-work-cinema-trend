import { combineReducers } from "@reduxjs/toolkit";
import { api } from "../api/api";
import authReducer from './auth/authSlice'
import userReducer from './user/userSlice';

export const rootReducers = combineReducers({
    user: userReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
})

export type RootState = ReturnType<typeof rootReducers>;