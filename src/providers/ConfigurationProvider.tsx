import { StatusEnum } from '@gjv/redux-slice-factory'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ConfigurationDuck } from '../features/configuration'
import useRequester from '../hooks/UseRequester'
import Spinner from '../screens/Spinner'

const ConfigurationProvider: React.FunctionComponent = ({ children }) => {
    const dispatch = useDispatch()

    const configuration = useRequester(
        ConfigurationDuck.Selectors.selectShouldMakeRequest,
        ConfigurationDuck.Selectors.selectSliceState,
        () => dispatch(ConfigurationDuck.Actions.get())
    )

    return configuration.status === StatusEnum.Settled && configuration.lastHydrated !== null
        ? (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
        : (
            <Spinner debugMessage={configuration.status === StatusEnum.Requesting ? 'Loading Configuration' : 'Failed to load Configuration'} />
        )
}

export default ConfigurationProvider
