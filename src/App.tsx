import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as AppRouter, Route, Switch as RouterSwitch } from 'react-router-dom';
import AppAuthProvider from './providers/AppAuthProvider';
import AppConfigProvider from './providers/AppConfigProvider';
import AppThemeProvider from './providers/AppThemeProvider';
import HomeScreen from './screens/Home';
import NotFoundScreen from './screens/NotFound';
import store from './store/configureStore';

function App(): JSX.Element {
    return (
        <AppRouter>
            <Provider store={store}>
                <AppConfigProvider>
                    <AppThemeProvider>
                        <AppAuthProvider>
                            <RouterSwitch>
                                <Route
                                    exact={true}
                                    path={'/'}
                                >
                                    {'moodful'}
                                </Route>
                                <Route
                                    path={['/moodful']}
                                >
                                    <HomeScreen.Component />
                                </Route>
                                <Route
                                    path={[NotFoundScreen.Path, '*']}
                                    status={404}
                                >
                                    <NotFoundScreen.Component />
                                </Route>
                            </RouterSwitch>
                        </AppAuthProvider>
                    </AppThemeProvider>
                </AppConfigProvider>
            </Provider>
        </AppRouter>
    );
}

export default App;
