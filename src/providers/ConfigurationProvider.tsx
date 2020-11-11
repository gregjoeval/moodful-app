import { StatusEnum } from '@gjv/redux-slice-factory';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigurationDuck } from '../features/configuration';
import usePolling from '../hooks/UsePolling';
import Spinner from '../screens/Spinner';

const ConfigurationProvider: React.FunctionComponent = ({ children }) => {
    const dispatch = useDispatch();

    const configurationLastHydrated = useSelector(ConfigurationDuck.Selectors.selectLastHydrated);
    const configurationStatus = useSelector(ConfigurationDuck.Selectors.selectStatus);

    usePolling(() => dispatch(ConfigurationDuck.Actions.get()), 15 * 60 * 1000);

    return configurationStatus === StatusEnum.Settled && configurationLastHydrated !== null
        ? (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
        : (
            <Spinner debugMessage={'Loading Configuration'} />
        );
};

export default ConfigurationProvider;
