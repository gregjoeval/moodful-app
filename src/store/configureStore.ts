import { AnyAction, configureStore as rtkConfigureStore, EnhancedStore, Middleware } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import ConfigurationReducer, { ConfigurationSliceState } from '../features/configuration'
import ReviewsReducer, { ReviewsSliceState } from '../features/reviews'
import TagsReducer, { TagsSliceState } from '../features/tags'
import ThemeReducer, { ThemeSliceState } from '../features/theme'
import { isInDevBuildEnv } from '../lib/Utilities'

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
    ReviewTags: TagsReducer,
}

const configureStore = (): { store: EnhancedStore<IGlobalState, AnyAction, ReadonlyArray<Middleware<unknown, IGlobalState>>> } => {
    const logger = createLogger({
        predicate: () => isInDevBuildEnv(),
        collapsed: true,
        duration: true,
        diff: true,
    })

    const store = rtkConfigureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
        devTools: process.env.NODE_ENV !== 'production',
    })

    return {
        store: store,
    }
}

export default configureStore
