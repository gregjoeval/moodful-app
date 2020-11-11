import { withAuthenticationRequired } from '@auth0/auth0-react';
import { FlexLayout } from '@gjv/material-ui-adjunct';
import { Typography } from '@material-ui/core';
import React from 'react';
import Header from '../components/Header/Header';
import CreateReviewFab from '../features/reviews/CreateReviewFab';
import withJWT from '../higher-order-components/WithJWT';
import { ScreenLayout } from '../layouts';
import ScreenModel from '../models/ScreenModel';

const Path = '/tags';
const Name = 'Tags';

const Tags: React.FunctionComponent = () => (
    <React.Fragment>
        <CreateReviewFab />
        <ScreenLayout header={<Header />}>
            <FlexLayout
                direction={'column'}
                spacing={1}
            >
                <Typography variant={'h5'}>
                    {Name}
                </Typography>
                <Typography variant={'body1'}>
                    {'Work in progress'}
                </Typography>
            </FlexLayout>
        </ScreenLayout>
    </React.Fragment>
);

const TagsScreen = ScreenModel.create({
    Component: withAuthenticationRequired(withJWT(Tags)),
    Path: Path,
    Name: Name
});

export default TagsScreen;
