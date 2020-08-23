import { FlexLayout } from '@gjv/material-ui-adjunct';
import { Typography, Paper } from '@material-ui/core';
import React from 'react';
import Header from '../components/Header/Header';
import { ScreenLayout } from '../layouts';
import ScreenModel from '../models/ScreenModel';

const Path = '/about';
const Name = 'About';

const About: React.FunctionComponent = () => (
    <ScreenLayout header={<Header />}>
        <Paper>
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
        </Paper>
    </ScreenLayout>
);

const AboutScreen = ScreenModel.create({
    Component: About,
    Path: Path,
    Name: Name
});

export default AboutScreen;
