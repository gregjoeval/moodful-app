import { withAuthenticationRequired } from '@auth0/auth0-react';
import { FlexLayout } from '@gjv/material-ui-adjunct';
import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import { ReviewsDuck } from '../features/reviews';
import CreateReviewFab from '../features/reviews/CreateReviewFab';
import ReviewCard from '../features/reviews/ReviewCard';
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
                                <ReviewCard
                                    createdAt={review.createdAt}
                                    description={review.description}
                                    id={review.id}
                                    key={review.id}
                                    lastModified={review.lastModified}
                                    rating={review.rating}
                                    secret={review.secret}
                                    tagIds={review.tagIds}
                                />
                            ))
                        }
                    </FlexLayout>
                </FlexLayout>
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
