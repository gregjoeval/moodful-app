import { createModelSlice, IModelState } from '@gjv/redux-slice-factory'
import { PaletteType } from '@material-ui/core'
import { createSelector, PayloadAction } from '@reduxjs/toolkit'
import { IGlobalState } from '../../store/configureStore'
import { IDuck } from '../types'
import { IThemeModel } from './ThemeModel'
import { DefaultTheme } from './Themes'

export type SliceModel = IThemeModel
export type SliceState = IModelState<SliceModel>

const slice = createModelSlice<IGlobalState, SliceModel>({
    name: 'Theme',
    selectSliceState: (globalState) => globalState.Theme,
    initialState: {
        model: DefaultTheme,
    },
})

const togglePaletteType = (currentPaletteType: PaletteType): PayloadAction<Partial<SliceModel>> => slice.actions.update({ type: currentPaletteType === 'dark' ? 'light' : 'dark' })

const actions = {
    ...slice.actions,
    togglePaletteType: togglePaletteType,
}

const selectPaletteType = createSelector(
    slice.selectors.selectModel,
    (theme) => theme.type
)

const selectors = {
    ...slice.selectors,
    selectPaletteType: selectPaletteType,
}

const ThemeDuck: IDuck<SliceState, typeof actions, typeof selectors> = {
    Name: slice.name,
    Reducer: slice.reducer,
    Actions: actions,
    Selectors: selectors,
}

export default ThemeDuck
