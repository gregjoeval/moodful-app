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
import { DateTime } from 'luxon'
import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { IGlobalState } from '../../store/configureStore'
import TagFormFields from './TagFormFields'
import { ITagModel, TagModel, TagsDuck } from './index'

const useStyles = makeStyles<Theme>((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    },
}))

const dialogId = 'tag-dialog'
type FormModel = ITagModel

const CreateTagFab: React.FunctionComponent = () => {
    const classes = useStyles()
    const dispatch = useDispatch<ThunkDispatch<IGlobalState, null, AnyAction>>()
    const methods = useForm<FormModel>()
    const [openDialogId, setOpenDialogId] = useState<string | null>(null)
    const reviewsSliceState = useSelector(TagsDuck.Selectors.selectSliceState)

    const onSubmit = useCallback((model: FormModel) => {
        const timestamp = DateTime.now().toISO()
        const tag = TagModel.create({
            id: model.id ?? uuid(),
            createdAt: timestamp,
            color: model.color,
            title: model.title,
            avatar: model.avatar,
        })
        void dispatch(TagsDuck.Actions.create(tag))
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
                        {'Create a tag.'}
                    </DialogTitle>
                    <DialogContent>
                        <FormProvider {...methods}>
                            <TagFormFields />
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

export default CreateTagFab
