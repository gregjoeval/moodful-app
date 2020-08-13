import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigurationDuck } from '../features/configuration';

const AppConfigProvider: React.FunctionComponent = ({ children }) => {
    const dispatch = useDispatch();

    const configurationHasInitialized = useSelector(ConfigurationDuck.Selectors.selectHasInitialized);

    useEffect(() => {
        if (!configurationHasInitialized) {
            dispatch(ConfigurationDuck.Actions.get());
        }
    }, [configurationHasInitialized, dispatch]);

    return configurationHasInitialized
        ? (
            <Fragment>
                {children}
            </Fragment>
        )
        : (
            <div>
                {'loading'}
            </div>
        );
};

export default AppConfigProvider;
