import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
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

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
    reducer: reducers,
    middleware: middleware,
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
