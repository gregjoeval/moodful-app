import MomentUtils from '@date-io/moment'
import { createMuiTheme, CssBaseline, useMediaQuery } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ThemeDuck } from '../features/theme'
import ThemeModel from '../features/theme/ThemeModel'
import { DefaultTheme } from '../features/theme/Themes'
import { isNil } from '../lib/Utilities'

const ThemeProvider: React.FunctionComponent = ({ children }) => {
    const themeGlobalState = useSelector(ThemeDuck.Selectors.selectModel)

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    const theme = useMemo(
        () => {
            const themeModel = isNil(themeGlobalState)
                ? ThemeModel.create({
                    ...DefaultTheme,
                    type: prefersDarkMode ? 'dark' : 'light',
                })
                : themeGlobalState
            const muiThemeOptions = ThemeModel.toMuiThemeOptions(themeModel)
            return createMuiTheme(muiThemeOptions)
        },
        [prefersDarkMode, themeGlobalState]
    )

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    {children}
                </MuiPickersUtilsProvider>
            </CssBaseline>
        </MuiThemeProvider>
    )
}

export default ThemeProvider
