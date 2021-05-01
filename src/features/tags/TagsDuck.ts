import { createEntitySlice, IEntityState, StatusEnum } from '@gjv/redux-slice-factory'
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { createTag, deleteTag, getTags } from '../../data-sources/moodful-api'
import { isNil, mapErrorToSerializableObject, nameOf } from '../../lib/Utilities'
import { IGlobalState } from '../../store/configureStore'
import { IDuck } from '../types'
import { ITagModel } from './TagModel'

type SliceModel = ITagModel
export type SliceState = IEntityState<SliceModel>

const slice = createEntitySlice<IGlobalState, SliceModel>({
    name: nameOf<IGlobalState>('ReviewTags'),
    selectSliceState: (globalState) => globalState.ReviewTags,
    selectId: (o) => o.id,
    sortComparer: (a, b) => {
        if (isNil(a.createdAt)) return -1
        if (isNil(b.createdAt)) return -1
        const aCreatedAt = DateTime.fromISO(a.createdAt)
        const bCreatedAt = DateTime.fromISO(b.createdAt)
        return aCreatedAt.diff(bCreatedAt, 'seconds').as('seconds')
    },
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

const selectors = {
    ...slice.selectors,
}

const TagsDuck: IDuck<SliceState, typeof actions, typeof selectors> = {
    Name: slice.name,
    Reducer: slice.reducer,
    Actions: actions,
    Selectors: selectors,
}

export default TagsDuck
