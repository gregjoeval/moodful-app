import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as AppRouter, Route, Switch as RouterSwitch } from 'react-router-dom';
import AppThemeProvider from './providers/AppThemeProvider';
import store from './store/configureStore';

function App() {
    return (
        <AppRouter>
            <Provider store={store}>
                <AppThemeProvider>
                    <RouterSwitch>
                        <Route>
                            {'moodful'}
                        </Route>
                    </RouterSwitch>
                </AppThemeProvider>
            </Provider>
        </AppRouter>
    );
}

export default App;
