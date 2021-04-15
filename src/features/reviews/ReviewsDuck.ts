import { createEntitySlice, IEntityState, StatusEnum } from '@gjv/redux-slice-factory'
import { Dispatch, ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { createReview, getReviews } from '../../data-sources/moodful-api'
import { mapErrorToSerializableObject } from '../../lib/Utilities'
import { IGlobalState } from '../../store/configureStore'
import { IDuck } from '../types'
import { IReviewModel } from './ReviewModel'

type SliceModel = IReviewModel
export type SliceState = IEntityState<SliceModel>

const slice = createEntitySlice<IGlobalState, SliceModel>({
    name: 'Reviews',
    selectSliceState: (globalState) => globalState.Reviews,
    selectId: (o) => o.id,
    sortComparer: (a, b) => moment(a.createdAt).diff(b.createdAt, 'seconds'),
})

const get = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(slice.actions.setStatus(StatusEnum.Requesting))
    dispatch(slice.actions.setError(null))

    try {
        const reviews = await getReviews()
        dispatch(slice.actions.hydrateAll(reviews))
        dispatch(slice.actions.setStatus(StatusEnum.Settled))
    } catch (e: unknown) {
        dispatch(slice.actions.setStatus(StatusEnum.Failed))
        dispatch(slice.actions.setError(mapErrorToSerializableObject(e as Error)))
    }
}

const create = (model: SliceModel) => async (dispatch: ThunkDispatch<IGlobalState, null, AnyAction>): Promise<void> => {
    dispatch(slice.actions.setStatus(StatusEnum.Requesting))
    dispatch(slice.actions.setError(null))

    try {
        const review = await createReview(model)
        dispatch(slice.actions.hydrateOne(review))
        dispatch(slice.actions.setStatus(StatusEnum.Settled))
    } catch (e: unknown) {
        dispatch(slice.actions.setStatus(StatusEnum.Failed))
        dispatch(slice.actions.setError(mapErrorToSerializableObject(e as Error)))
    }
}

const actions = {
    ...slice.actions,
    get: get,
    create: create,
}

const selectors = {
    ...slice.selectors,
}

const ReviewsDuck: IDuck<SliceState, typeof actions, typeof selectors> = {
    Name: slice.name,
    Reducer: slice.reducer,
    Actions: actions,
    Selectors: selectors,
}

export default ReviewsDuck
