import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ConfigurationDuck } from '../features/configuration';

const AuthProvider: React.FunctionComponent = ({ children }) => {
    const history = useHistory();

    const configurationModel = useSelector(ConfigurationDuck.Selectors.selectModel);

    return (
        <Auth0Provider
            audience={configurationModel.MoodfulApiUri}
            clientId={configurationModel.Auth0ClientId}
            domain={configurationModel.Auth0Domain}
            redirectUri={window.location.origin}
            onRedirectCallback={(appState) => {
                // Use the router's history module to replace the url
                history.replace(appState?.returnTo ?? window.location.pathname);
            }}
        >
            {children}
        </Auth0Provider>
    );
};

export default AuthProvider;
