import { withAuthenticationRequired } from '@auth0/auth0-react';
import { FlexLayout } from '@gjv/material-ui-adjunct';
import { Typography, Paper } from '@material-ui/core';
import React from 'react';
import CreateReviewFab from '../components/CreateReviewFab';
import Header from '../components/Header/Header';
import withJWT from '../higher-order-components/WithJWT';
import { ScreenLayout } from '../layouts';
import ScreenModel from '../models/ScreenModel';

const Path = '/tags';
const Name = 'Tags';

const Tags: React.FunctionComponent = () => (
    <React.Fragment>
        <CreateReviewFab />
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
    </React.Fragment>
);

const TagsScreen = ScreenModel.create({
    Component: withAuthenticationRequired(withJWT(Tags)),
    Path: Path,
    Name: Name
});

export default TagsScreen;
