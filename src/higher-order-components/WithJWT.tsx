import { useAuth0 } from '@auth0/auth0-react'
import { DateTime } from 'luxon'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { ConfigurationDuck } from '../features/configuration'
import usePolling from '../hooks/UsePolling'

const accessTokenStorageKey = 'AccessToken'

const parseToken = (token: string): Record<string, string> => {
    const payload = token.split(/[.]/)[1]
    const decodedToken = window.atob(payload)
    return JSON.parse(decodedToken) as Record<string, string>
}
const getToken = (): string | null => window.localStorage.getItem(accessTokenStorageKey)
const setToken = (value: string): void => window.localStorage.setItem(accessTokenStorageKey, value)
const removeToken = (): void => window.localStorage.removeItem(accessTokenStorageKey)

export const getAccessToken = (): string => {
    const accessToken = getToken()
    if (accessToken === null) {
        // eslint-disable-next-line no-console
        console.warn('No access token in storage.')
        return 'DEFAULT_ACCESS_TOKEN'
    }

    return accessToken
}

export const getSubjectFromAccessToken = (): string | null => {
    const accessToken = getToken()
    if (accessToken === null) return null

    const { sub } = parseToken(accessToken)
    return sub
}

const intervalWithToken = 15 * 60 * 1000
const intervalWithoutToken = 3 * 1000

const withJWT = <Props extends Record<string, unknown>> (Component: React.ComponentType<Props>): React.FunctionComponent<Props> => (props) => {
    const [isLoading, setIsLoading] = useState(false)

    const token = getToken()

    const { getAccessTokenSilently, isAuthenticated } = useAuth0()
    const configurationModel = useSelector(ConfigurationDuck.Selectors.selectModel)

    const getAccessTokenAsync = useCallback(async () => {
        setIsLoading(true)
        try {
            const accessToken = await getAccessTokenSilently({
                audience: configurationModel.MoodfulApiUri,
            })
            // eslint-disable-next-line no-console
            console.debug('Obtained access token.')
            setToken(accessToken)
        } catch (e: unknown) {
            // eslint-disable-next-line no-console
            console.error('Failed to obtain access token.', e)
        }
        setIsLoading(false)
    }, [configurationModel.MoodfulApiUri, getAccessTokenSilently])

    usePolling(
        () => {
            if (!isLoading) {
                // eslint-disable-next-line no-console
                console.debug('Checking access token...')

                if (!isAuthenticated) {
                    removeToken()
                } else if (token === null) {
                    void getAccessTokenAsync()
                } else {
                    const { exp } = parseToken(token)
                    const expiration = Number.parseInt(exp, 10)
                    const differenceInSeconds = DateTime.fromMillis(expiration)
                        .diffNow('seconds')
                        .as('seconds')
                    if (differenceInSeconds >= 0) {
                        // eslint-disable-next-line no-console
                        console.debug('Access token has expired.')
                        void getAccessTokenAsync()
                    }
                }
            }
        },
        token === null ? intervalWithoutToken : intervalWithToken
    )

    return <Component {...props} />
}

export default withJWT
