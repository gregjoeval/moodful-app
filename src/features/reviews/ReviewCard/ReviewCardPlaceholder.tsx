import { Skeleton } from '@material-ui/lab'
import React from 'react'

const ReviewCardPlaceholder: React.FunctionComponent = () => (
    <Skeleton
        height={120}
        variant={'rect'}
        width={'100%'}
    />
)

export default ReviewCardPlaceholder
