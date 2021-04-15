import { createModelSlice, IModelState, StatusEnum } from '@gjv/redux-slice-factory'
import { Dispatch } from '@reduxjs/toolkit'
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

const selectors = {
    ...slice.selectors,
}

const ConfigurationDuck: IDuck<SliceState, typeof actions, typeof selectors> = {
    Name: slice.name,
    Reducer: slice.reducer,
    Actions: actions,
    Selectors: selectors,
}

export default ConfigurationDuck
