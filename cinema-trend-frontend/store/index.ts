import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';
import { rootReducers } from './reducers';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();