import { withAuthenticationRequired } from '@auth0/auth0-react';
import { FlexLayout } from '@gjv/material-ui-adjunct';
import { Typography, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateReviewFab from '../components/CreateReviewFab';
import Header from '../components/Header/Header';
import { ReviewsDuck } from '../features/reviews';
import withJWT from '../higher-order-components/WithJWT';
import { ScreenLayout } from '../layouts';
import ScreenModel from '../models/ScreenModel';

const Path = '/reviews';
const Name = 'Reviews';

const Reviews: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    const [flag, setFlag] = useState(false);
    const reviews = useSelector(ReviewsDuck.Selectors.selectAll);
    const reviewsCanMakeRequest = useSelector(ReviewsDuck.Selectors.selectCanMakeRequest);
    const reviewsWasHydrated = useSelector(ReviewsDuck.Selectors.selectWasHydrated);

    useEffect(() => {
        if (!flag && reviewsCanMakeRequest && !reviewsWasHydrated) {
            setFlag(true);
            dispatch(ReviewsDuck.Actions.get());
        }
    }, [dispatch, flag, reviewsCanMakeRequest, reviewsWasHydrated]);

    return (
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
                        <FlexLayout
                            direction={'column'}
                            spacing={1}
                        >
                            {
                                reviews.map((review) => (
                                    <Typography
                                        key={review.id}
                                        variant={'body1'}
                                    >
                                        {review.createdAt}
                                    </Typography>
                                ))
                            }
                        </FlexLayout>
                    </FlexLayout>
                </Paper>
            </ScreenLayout>
        </React.Fragment>
    );
};

const ReviewsScreen = ScreenModel.create({
    Component: withAuthenticationRequired(withJWT(Reviews)),
    Path: Path,
    Name: Name
});

export default ReviewsScreen;
