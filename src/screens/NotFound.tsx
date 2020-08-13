import { FlexLayout } from '@gjv/material-ui-adjunct';
import { Typography } from '@material-ui/core';
import React from 'react';
import { ScreenLayout } from '../layouts';
import ScreenModel from '../models/ScreenModel';

const Path = '/not-found';
const Name = 'Not Found';

const NotFound: React.FunctionComponent = () => (
    <ScreenLayout>
        <FlexLayout
            direction={'column'}
            spacing={1}
        >
            <Typography variant={'h5'}>
                {Name}
            </Typography>
            <Typography variant={'body1'}>
                {'Oops, we couldn\'t find the page you were looking for...'}
            </Typography>
        </FlexLayout>
    </ScreenLayout>
);

const NotFoundScreen = ScreenModel.create({
    Component: NotFound,
    Path: Path,
    Name: Name
});

export default NotFoundScreen;
