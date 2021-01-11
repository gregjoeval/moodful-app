import React from 'react';
import withSuspense from '../../../higher-order-components/WithSuspense';
import ReviewCardPlaceholder from './ReviewCardPlaceholder';

const ReviewCardAsync = withSuspense({
    factory: async () => import('./ReviewCard'),
    fallback: <ReviewCardPlaceholder />
});

export default ReviewCardAsync;
