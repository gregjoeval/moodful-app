import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigurationDuck } from '../features/configuration';
import usePolling from '../hooks/UsePolling';

const ConfigProvider: React.FunctionComponent = ({ children }) => {
    const dispatch = useDispatch();

    const configurationHasInitialized = useSelector(ConfigurationDuck.Selectors.selectHasInitialized);

    usePolling(() => dispatch(ConfigurationDuck.Actions.get()), 15 * 60 * 1000);

    return configurationHasInitialized
        ? (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
        : (
            <div>
                {'loading'}
            </div>
        );
};

export default ConfigProvider;
