import { StatusEnum } from '@gjv/redux-slice-factory'
import {
    Fab,
    Theme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/styles'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { getISOStringWithOffset } from '../../lib/Utilities'
import { IGlobalState } from '../../store/configureStore'
import ReviewFormFields from './ReviewFormFields'
import { IReviewModel, ReviewModel, ReviewsDuck } from './index'

const useStyles = makeStyles<Theme>((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    },
}))

const dialogId = 'review-dialog'

const CreateReviewFab: React.FunctionComponent = () => {
    const classes = useStyles()
    const dispatch = useDispatch<ThunkDispatch<IGlobalState, null, AnyAction>>()
    const methods = useForm<IReviewModel>()
    const [openDialogId, setOpenDialogId] = useState<string | null>(null)
    const reviewsSliceState = useSelector(ReviewsDuck.Selectors.selectSliceState)

    const onSubmit = useCallback((model: IReviewModel) => {
        const timestamp = getISOStringWithOffset()
        const review = ReviewModel.create({
            id: model.id ?? uuid(),
            createdAt: model.createdAt ?? timestamp,
            lastModified: timestamp,
            rating: model.rating,
            description: model.description,
            secret: model.secret,
            tagIds: model.tagIds,
        })
        void dispatch(ReviewsDuck.Actions.create(review))
        setOpenDialogId(null)
    }, [dispatch])

    return (
        <React.Fragment>
            <Fab
                className={classes.fab}
                color={'primary'}
                onClick={() => {
                    setOpenDialogId(dialogId)
                }}
            >
                <AddIcon color={'action'} />
            </Fab>
            <Dialog
                aria-labelledby={`${dialogId}-title`}
                disableBackdropClick={true}
                fullWidth={true}
                id={dialogId}
                open={Boolean(openDialogId)}
                onClose={() => setOpenDialogId(null)}
            >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <DialogTitle id={`${dialogId}-title`}>
                        {'Describe your mood.'}
                    </DialogTitle>
                    <DialogContent>
                        <FormProvider {...methods}>
                            <ReviewFormFields />
                        </FormProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color={'primary'}
                            type={'submit'}
                        >
                            {
                                reviewsSliceState.status === StatusEnum.Requesting
                                    ? (
                                        <CircularProgress
                                            color={'inherit'}
                                            size={28}
                                        />
                                    )
                                    : 'Save'
                            }
                        </Button>
                        <Button
                            color={'primary'}
                            type={'button'}
                            onClick={() => setOpenDialogId(null)}
                        >
                            {'Cancel'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    )
}

export default CreateReviewFab
