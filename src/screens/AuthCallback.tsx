import { FlexLayout } from '@gjv/material-ui-adjunct';
import { Typography } from '@material-ui/core';
import React from 'react';
import { ScreenLayout } from '../layouts';
import { IScreenModel } from '../models/ScreenModel';

const Path = '/auth-callback';
const Name = 'Auth Callback';

const AuthCallback: React.FunctionComponent = () => (
    <ScreenLayout>
        <FlexLayout
            direction={'column'}
            spacing={1}
        >
            <Typography variant={'h5'}>
                {Name}
            </Typography>
            <Typography variant={'body1'}>
                {'You will be redirected shortly.'}
            </Typography>
        </FlexLayout>
    </ScreenLayout>
);

const AuthCallbackScreen: IScreenModel = {
    Component: AuthCallback,
    Path: Path,
    Name: Name
};

export default AuthCallbackScreen;
