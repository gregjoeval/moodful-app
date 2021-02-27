import MomentUtils from '@date-io/moment'
import { createMuiTheme, CssBaseline } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ThemeDuck } from '../features/theme'
import ThemeModel from '../features/theme/ThemeModel'

const ThemeProvider: React.FunctionComponent = ({ children }) => {
    const themeGlobalState = useSelector(ThemeDuck.Selectors.selectModel)

    const theme = useMemo(() => createMuiTheme(ThemeModel.toMuiThemeOptions(themeGlobalState)), [themeGlobalState])

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
