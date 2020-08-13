import { withAuthenticationRequired } from '@auth0/auth0-react';
import { FlexLayout } from '@gjv/material-ui-adjunct';
import { Typography } from '@material-ui/core';
import React from 'react';
import { ScreenLayout } from '../layouts';
import ScreenModel from '../models/ScreenModel';

const Path = '/home';
const Name = 'Home';

const Home: React.FunctionComponent = () => (
    <ScreenLayout>
        <FlexLayout
            direction={'column'}
            spacing={1}
        >
            <Typography variant={'h5'}>
                {Name}
            </Typography>
            <Typography variant={'body1'}>
                {'Welcome to Moodful'}
            </Typography>
        </FlexLayout>
    </ScreenLayout>
);

const HomeScreen = ScreenModel.create({
    Component: withAuthenticationRequired(Home),
    Path: Path,
    Name: Name
});

export default HomeScreen;
