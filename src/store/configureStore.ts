import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import ThemeReducer, { ThemeSliceState } from '../features/theme';

export interface IGlobalState {
    Theme: ThemeSliceState;
}

const reducers = {
    Theme: ThemeReducer
};

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
    reducer: reducers,
    middleware: middleware,
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
