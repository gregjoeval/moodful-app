import { Typography, Paper, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { IReviewModel } from '../ReviewModel'

const useStyles = makeStyles<Theme>((theme) => ({
    paper: {
        padding: theme.spacing(1),
    },
}))

// TODO using the model interface is temporary
const ReviewCard: React.FunctionComponent<IReviewModel> = ({ rating, description, createdAt, lastModified }) => {
    const classes = useStyles()

    return (
        <Paper className={classes.paper}>
            <Typography>{rating}</Typography>
            <Typography>{description}</Typography>
            <Typography>{createdAt}</Typography>
            <Typography>{lastModified}</Typography>
        </Paper>
    )
}

export default ReviewCard
