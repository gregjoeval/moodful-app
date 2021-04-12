import { createEntitySlice, IEntityState, StatusEnum } from '@gjv/redux-slice-factory'
import { AnyAction, createSelector, Dispatch, ThunkDispatch } from '@reduxjs/toolkit'
import moment from 'moment'
import { createTag, deleteTag, getTags } from '../../data-sources/moodful-api'
import { mapErrorToSerializableObject } from '../../lib/Utilities'
import { IGlobalState } from '../../store/configureStore'
import { IDuck } from '../types'
import { ITagModel } from './TagModel'

type SliceModel = ITagModel
export type SliceState = IEntityState<SliceModel>

const slice = createEntitySlice<IGlobalState, SliceModel>({
    name: 'ReviewTags',
    selectSliceState: (globalState) => globalState.ReviewTags,
    selectId: (o) => o.id,
    sortComparer: (a, b) => moment(a.createdAt).diff(b.createdAt, 'seconds'),
})

const get = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(slice.actions.setStatus(StatusEnum.Requesting))
    dispatch(slice.actions.setError(null))

    try {
        const reviews = await getTags()
        dispatch(slice.actions.hydrateAll(reviews))
        dispatch(slice.actions.setStatus(StatusEnum.Settled))
    } catch (e: unknown) {
        dispatch(slice.actions.setStatus(StatusEnum.Failed))
        dispatch(slice.actions.setError(e as Error))
    }
}

const create = (model: SliceModel) => async (dispatch: ThunkDispatch<IGlobalState, null, AnyAction>): Promise<void> => {
    dispatch(slice.actions.setStatus(StatusEnum.Requesting))
    dispatch(slice.actions.setError(null))

    try {
        const tag = await createTag(model)
        dispatch(slice.actions.hydrateOne(tag))
        dispatch(slice.actions.setStatus(StatusEnum.Settled))
    } catch (e: unknown) {
        dispatch(slice.actions.setStatus(StatusEnum.Failed))
        dispatch(slice.actions.setError(mapErrorToSerializableObject(e as Error)))
    }
}

const remove = (id: SliceModel['id']) => async (dispatch: ThunkDispatch<IGlobalState, null, AnyAction>): Promise<void> => {
    dispatch(slice.actions.setStatus(StatusEnum.Requesting))
    dispatch(slice.actions.setError(null))

    try {
        await deleteTag(id)
        await dispatch(get())
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
    remove: remove,
}

const selectShouldMakeRequest = createSelector(
    slice.selectors.selectStatus,
    slice.selectors.selectError,
    slice.selectors.selectLastHydrated,
    slice.selectors.selectLastModified,
    (status, error, lastHydrated, lastModified) => status === StatusEnum.Settled && error === null && lastHydrated === null && lastModified === null
)

const selectors = {
    ...slice.selectors,
    selectShouldMakeRequest: selectShouldMakeRequest,
}

const TagsDuck: IDuck<SliceState, typeof actions, typeof selectors> = {
    Name: slice.name,
    Reducer: slice.reducer,
    Actions: actions,
    Selectors: selectors,
}

export default TagsDuck
