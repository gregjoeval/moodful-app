import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import ConfigurationReducer, { ConfigurationSliceState } from '../features/configuration';
import ReviewsReducer, { ReviewsSliceState } from '../features/reviews';
import TagsReducer, { TagsSliceState } from '../features/tags';
import ThemeReducer, { ThemeSliceState } from '../features/theme';

export interface IGlobalState {
    Configuration: ConfigurationSliceState;
    Theme: ThemeSliceState;
    Reviews: ReviewsSliceState;
    ReviewTags: TagsSliceState;
}

const reducers = {
    Theme: ThemeReducer,
    Configuration: ConfigurationReducer,
    Reviews: ReviewsReducer,
    ReviewTags: TagsReducer
};

const logger = createLogger({
    // TODO: You probably want the predicate to be based on an environment variable rather than NODE_ENV
    predicate: (getState, action) => process.env.NODE_ENV !== 'production' && action?.meta?.debug !== false,
    collapsed: true,
    duration: true,
    diff: true
});

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
    reducer: reducers,
    middleware: middleware,
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
