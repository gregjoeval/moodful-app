import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ConfigurationDuck } from '../features/configuration';
import usePolling from '../hooks/UsePolling';

const accessTokenStorageKey = 'AccessToken';

const parseToken = (token: string): any => {
    const payload = token.split(/[.]/)[1];
    const decodedToken = window.atob(payload);
    return JSON.parse(decodedToken);
};
const getToken = (): string | null => window.localStorage.getItem(accessTokenStorageKey);
const setToken = (value: string): void => window.localStorage.setItem(accessTokenStorageKey, value);
const removeToken = (): void => window.localStorage.removeItem(accessTokenStorageKey);

export const getAccessToken = (): string => {
    const accessToken = getToken();
    if (accessToken === null) {
        // eslint-disable-next-line no-console
        console.warn('No access token in storage.');
        return 'DEFAULT_ACCESS_TOKEN';
    }

    return accessToken;
};

const intervalWithToken = 15 * 60 * 1000;
const intervalWithoutToken = 3 * 1000;

const withJWT = <Props extends object> (Component: React.ComponentType<Props>): React.FunctionComponent<Props> => (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const token = getToken();

    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const configurationModel = useSelector(ConfigurationDuck.Selectors.selectModel);

    const getAccessTokenAsync = useCallback(async () => {
        setIsLoading(true);
        try {
            const accessToken = await getAccessTokenSilently({
                // eslint-disable-next-line @typescript-eslint/camelcase
                // redirect_uri: window.location.origin,
                audience: configurationModel.MoodfulApiUri
            });
            // eslint-disable-next-line no-console
            console.debug('Obtained access token.');
            setToken(accessToken);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Failed to obtain access token.', e);
        }
        setIsLoading(false);
    }, [configurationModel.MoodfulApiUri, getAccessTokenSilently]);

    usePolling(
        async () => {
            if (!isLoading) {
                // eslint-disable-next-line no-console
                console.debug('Checking access token...');

                if (!isAuthenticated) {
                    removeToken();
                } else if (token === null) {
                    await getAccessTokenAsync();
                } else {
                    const { exp } = parseToken(token);
                    const now = moment();
                    const expirationDate = moment(exp, 'x'); // 'x' is Unix ms timestamp
                    const difference = now.diff(expirationDate, 'milliseconds');
                    if (difference >= 0) {
                        // eslint-disable-next-line no-console
                        console.debug('Access token has expired.');
                        await getAccessTokenAsync();
                    }
                }
            }
        },
        token === null ? intervalWithoutToken : intervalWithToken
    );

    return <Component {...props} />;
};

export default withJWT;
