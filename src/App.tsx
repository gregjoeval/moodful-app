import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as AppRouter, Route, Switch as RouterSwitch } from 'react-router-dom'
import AuthenticationProvider from './providers/AuthenticationProvider'
import ConfigurationProvider from './providers/ConfigurationProvider'
import ThemeProvider from './providers/ThemeProvider'
import AboutScreen from './screens/About'
import NotFoundScreen from './screens/NotFound'
import ReviewsScreen from './screens/Reviews'
import TagsScreen from './screens/Tags'
import configureStore from './store/configureStore'

const { store } = configureStore()

function App(): JSX.Element {
    return (
        <AppRouter>
            <Provider store={store}>
                <ThemeProvider>
                    <ConfigurationProvider>
                        <AuthenticationProvider>
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
                                <Route path={['*']}>
                                    <NotFoundScreen.Component />
                                </Route>
                            </RouterSwitch>
                        </AuthenticationProvider>
                    </ConfigurationProvider>
                </ThemeProvider>
            </Provider>
        </AppRouter>
    )
}

export default App
