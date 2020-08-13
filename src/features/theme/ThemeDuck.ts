import { createModelSlice, IModelState } from '@gjv/redux-slice-factory';
import { IGlobalState } from '../../store/configureStore';
import { IDuck } from '../types';
import { IThemeModel } from './ThemeModel';
import { DefaultTheme } from './Themes';

export type SliceModel = IThemeModel
export type SliceState = IModelState<SliceModel>

const slice = createModelSlice<IGlobalState, SliceModel>({
    name: 'Theme',
    selectSliceState: (globalState) => globalState.Theme,
    initialState: {
        model: DefaultTheme
    }
});

const ThemeDuck: IDuck<SliceState, typeof slice.actions, typeof slice.selectors> = {
    Name: slice.name,
    Reducer: slice.reducer,
    Actions: slice.actions,
    Selectors: slice.selectors
};

export default ThemeDuck;
