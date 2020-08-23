import { Fab, Theme, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ReviewModel, ReviewsDuck } from '../features/reviews';
import { getISOStringWithOffset } from '../lib/Utilities';
import ReviewForm from './ReviewForm';

const useStyles = makeStyles<Theme>((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4)
    }
}));

const CreateReviewFab: React.FunctionComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openDialogId, setOpenDialogId] = useState<string | null>(null);
    const dialogId = 'review-dialog';

    return (
        <React.Fragment>
            <Fab
                className={classes.fab}
                color={'primary'}
                onClick={() => {
                    setOpenDialogId(dialogId);
                }}
            >
                <AddIcon color={'action'} />
            </Fab>
            <Dialog
                aria-labelledby={`${dialogId}-title`}
                id={dialogId}
                onClose={() => setOpenDialogId(null)}
                open={Boolean(openDialogId)}
            >
                <DialogTitle id={`${dialogId}-title`}>
                    {'Describe your mood.'}
                </DialogTitle>
                <DialogContent>
                    <ReviewForm
                        isSubmitting={false}
                        model={{}}
                        onSubmit={(model) => {
                            const timestamp = getISOStringWithOffset();
                            const review = ReviewModel.create({
                                id: model.id ?? uuid(),
                                createdAt: model.createdAt ?? timestamp,
                                lastModified: timestamp,
                                rating: model.rating,
                                description: model.description,
                                secret: model.secret,
                                tags: model.tags
                            });
                            dispatch(ReviewsDuck.Actions.create(review));
                            setOpenDialogId(null);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default CreateReviewFab;
