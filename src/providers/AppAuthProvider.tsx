import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ConfigurationDuck } from '../features/configuration';

const AppAuthProvider: React.FunctionComponent = ({ children }) => {
    const history = useHistory();

    const configurationModel = useSelector(ConfigurationDuck.Selectors.selectModel);

    return (
        <Auth0Provider
            audience={configurationModel.MoodfulApiUri}
            clientId={configurationModel.Auth0ClientId}
            domain={configurationModel.Auth0Domain}
            onRedirectCallback={(appState) => {
                // Use the router's history module to replace the url
                history.replace(appState?.returnTo ?? window.location.pathname);
            }}
            redirectUri={window.location.origin}
        >
            {children}
        </Auth0Provider>
    );
};

export default AppAuthProvider;
