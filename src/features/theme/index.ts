import ThemeDuck, { SliceModel, SliceState } from './ThemeDuck';
import ThemeModel, { IThemeModel as ModelType } from './ThemeModel';

const ThemeReducer = ThemeDuck.Reducer;

export default ThemeReducer;
export { ThemeDuck, ThemeModel };
export type ThemeSliceModel = SliceModel;
export type ThemeSliceState = SliceState;
export type IThemeModel = ModelType;
