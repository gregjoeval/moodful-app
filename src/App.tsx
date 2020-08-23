import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as AppRouter, Route, Switch as RouterSwitch } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import ConfigProvider from './providers/ConfigProvider';
import ThemeProvider from './providers/ThemeProvider';
import AboutScreen from './screens/About';
import NotFoundScreen from './screens/NotFound';
import ReviewsScreen from './screens/Reviews';
import TagsScreen from './screens/Tags';
import store from './store/configureStore';

function App(): JSX.Element {
    return (
        <AppRouter>
            <Provider store={store}>
                <ConfigProvider>
                    <ThemeProvider>
                        <AuthProvider>
                            <RouterSwitch>
                                <Route
                                    exact={true}
                                    path={'/'}
                                >
                                    <AboutScreen.Component />
                                </Route>
                                <Route path={[AboutScreen.Path]}>
                                    <AboutScreen.Component />
                                </Route>
                                <Route path={[ReviewsScreen.Path]}>
                                    <ReviewsScreen.Component />
                                </Route>
                                <Route path={[TagsScreen.Path]}>
                                    <TagsScreen.Component />
                                </Route>
                                <Route
                                    path={['*']}
                                    status={404}
                                >
                                    <NotFoundScreen.Component />
                                </Route>
                            </RouterSwitch>
                        </AuthProvider>
                    </ThemeProvider>
                </ConfigProvider>
            </Provider>
        </AppRouter>
    );
}

export default App;
