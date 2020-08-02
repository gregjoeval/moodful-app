import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ThemeDuck } from '../features/theme';
import ThemeModel from '../features/theme/ThemeModel';

interface IAppThemeProviderProps {
    children: ReactNode;
}

const AppThemeProvider: FunctionComponent<IAppThemeProviderProps> = ({ children }: IAppThemeProviderProps) => {
    const themeGlobalState = useSelector(ThemeDuck.Selectors.selectModel);

    const theme = useMemo(() => createMuiTheme(ThemeModel.toMuiThemeOptions(themeGlobalState)), [themeGlobalState]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                {children}
            </CssBaseline>
        </ThemeProvider>
    );
};

export default AppThemeProvider;
