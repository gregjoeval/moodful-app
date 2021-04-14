import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Stack } from '@gjv/material-ui-adjunct'
import { Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import Header from '../components/Header/Header'
import { ReviewsDuck } from '../features/reviews'
import CreateReviewFab from '../features/reviews/CreateReviewFab'
import ReviewCardAsync from '../features/reviews/ReviewCard'
import withJWT from '../higher-order-components/WithJWT'
import useRequester from '../hooks/UseRequester'
import { ScreenLayout } from '../layouts'
import ScreenModel from '../models/ScreenModel'

const Path = '/reviews'
const Name = 'Reviews'

const Reviews: React.FunctionComponent = () => {
    const dispatch = useDispatch()

    const reviews = useRequester(
        ReviewsDuck.Selectors.selectShouldMakeRequest,
        ReviewsDuck.Selectors.selectAll,
        () => dispatch(ReviewsDuck.Actions.get())
    )

    return (
        <React.Fragment>
            <CreateReviewFab />
            <ScreenLayout header={<Header />}>
                <Stack
                    direction={'column'}
                    spacing={1}
                >
                    <Typography variant={'h5'}>
                        {Name}
                    </Typography>
                    <Stack
                        direction={'column'}
                        spacing={1}
                    >
                        {
                            reviews.map((review) => (
                                <ReviewCardAsync
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
                    </Stack>
                </Stack>
            </ScreenLayout>
        </React.Fragment>
    )
}

const ReviewsScreen = ScreenModel.create({
    Component: withAuthenticationRequired(withJWT(Reviews)),
    Path: Path,
    Name: Name,
})

export default ReviewsScreen
