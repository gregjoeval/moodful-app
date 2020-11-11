import { FlexLayout } from '@gjv/material-ui-adjunct';
import { Typography } from '@material-ui/core';
import React from 'react';
import Header from '../components/Header/Header';
import { ScreenLayout } from '../layouts';
import ScreenModel from '../models/ScreenModel';

const Path = '/about';
const Name = 'About';

const About: React.FunctionComponent = () => (
    <ScreenLayout header={<Header />}>
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
            <Typography variant={'body1'}>
                {'Track your moods to figure out what makes you happy.'}
            </Typography>
            <Typography variant={'body1'}>
                {'Work in progress.'}
            </Typography>
        </FlexLayout>
    </ScreenLayout>
);

const AboutScreen = ScreenModel.create({
    Component: About,
    Path: Path,
    Name: Name
});

export default AboutScreen;
