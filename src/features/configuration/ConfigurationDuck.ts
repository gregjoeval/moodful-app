import { createModelSlice, IModelState, StatusEnum } from '@gjv/redux-slice-factory'
import { createSelector, Dispatch } from '@reduxjs/toolkit'
import { getConfiguration } from '../../data-sources/config'
import { IGlobalState } from '../../store/configureStore'
import { IDuck } from '../types'
import { IConfigurationModel } from './ConfigurationModel'

type SliceModel = IConfigurationModel
export type SliceState = IModelState<SliceModel>

const slice = createModelSlice<IGlobalState, SliceModel>({
    name: 'Configuration',
    selectSliceState: (globalState) => globalState.Configuration,
})

const get = () => (dispatch: Dispatch): void => {
    dispatch(slice.actions.setStatus(StatusEnum.Requesting))
    dispatch(slice.actions.setError(null))

    try {
        const configuration = getConfiguration()
        dispatch(slice.actions.hydrate(configuration))
        dispatch(slice.actions.setStatus(StatusEnum.Settled))
    } catch (e: unknown) {
        dispatch(slice.actions.setStatus(StatusEnum.Failed))
        dispatch(slice.actions.setError(e as Error))
    }
}

const actions = {
    ...slice.actions,
    get: get,
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

const ConfigurationDuck: IDuck<SliceState, typeof actions, typeof selectors> = {
    Name: slice.name,
    Reducer: slice.reducer,
    Actions: actions,
    Selectors: selectors,
}

export default ConfigurationDuck
