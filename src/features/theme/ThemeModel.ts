import { PaletteType, ThemeOptions } from '@material-ui/core'
import merge from 'lodash.merge'
import themeDefaults from './themeDefaults.json'

export interface IThemeModel {
    name: string;
    type: PaletteType;
    primaryColor?: string;
    secondaryColor?: string;
    errorColor?: string;
    warningColor?: string;
    infoColor?: string;
    successColor?: string;
}

interface IThemeOptions extends ThemeOptions {
    name: string;
}

const toMuiThemeOptions = (theme: IThemeModel): IThemeOptions => {
    const overrides = {
        name: theme.name,
        palette: {
            /* eslint-disable no-undefined */
            type: theme.type,
            primary: theme.primaryColor ? { main: theme.primaryColor } : undefined,
            secondary: theme.secondaryColor ? { main: theme.secondaryColor } : undefined,
            error: theme.errorColor ? { main: theme.errorColor } : undefined,
            warning: theme.warningColor ? { main: theme.warningColor } : undefined,
            info: theme.infoColor ? { main: theme.infoColor } : undefined,
            success: theme.successColor ? { main: theme.successColor } : undefined,
            /* eslint-enable no-undefined */
        },
    }

    // themeDefaults generated with https://my-mui.com/
    return merge<Record<string, unknown>, IThemeOptions>(themeDefaults, overrides)
}

const create = (args: Partial<IThemeModel>): IThemeModel => {
    if (!args.name) throw new Error('Missing required property name on ITheme')

    return {
        name: args.name,
        type: args.type ?? 'dark',
        primaryColor: args.primaryColor,
        secondaryColor: args.secondaryColor,
        errorColor: args.errorColor,
        warningColor: args.warningColor,
        infoColor: args.infoColor,
        successColor: args.successColor,
    }
}

const ThemeModel = {
    create: create,
    toMuiThemeOptions: toMuiThemeOptions,
}

export default ThemeModel
