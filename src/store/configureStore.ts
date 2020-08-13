import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import ConfigurationReducer, { ConfigurationSliceState } from '../features/configuration';
import ThemeReducer, { ThemeSliceState } from '../features/theme';

export interface IGlobalState {
    Configuration: ConfigurationSliceState;
    Theme: ThemeSliceState;
}

const reducers = {
    Theme: ThemeReducer,
    Configuration: ConfigurationReducer
};

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
    reducer: reducers,
    middleware: middleware,
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
