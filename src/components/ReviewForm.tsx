import { FlexLayout } from '@gjv/material-ui-adjunct';
import { Button, CircularProgress, TextField, Theme } from '@material-ui/core';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { Rating, IconContainerProps } from '@material-ui/lab';
import { RatingProps } from '@material-ui/lab/Rating/Rating';
import { Styles, withStyles } from '@material-ui/styles';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IReviewModel } from '../features/reviews';
import { nameOf } from '../lib/Utilities';

const StyledRating: React.ComponentType<RatingProps> = withStyles<Styles<Theme, any>>((theme) => ({
    iconFilled: {
        color: theme.palette.primary.main
    },
    iconHover: {
        color: theme.palette.primary.light
    }
}))(Rating);

const customIcons: { [index: string]: { icon: React.ReactElement; label: string } } = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: 'Very Dissatisfied'
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: 'Dissatisfied'
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: 'Neutral'
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: 'Satisfied'
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: 'Very Satisfied'
    }
};

function IconContainer(props: IconContainerProps): JSX.Element {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

type FormModel = IReviewModel;

interface IEditableFormModel extends Omit<FormModel, 'id'|'createdAt'|'lastModified'> {
    id?: string;
    createdAt?: string;
    lastModified?: string | null;
}

interface IReviewFormProps {
    model: Partial<IEditableFormModel>;
    onSubmit: (model: IEditableFormModel) => void;
    isSubmitting: boolean;
}

const ReviewForm: React.FunctionComponent<IReviewFormProps> = ({ model, onSubmit, isSubmitting }) => {
    const { register, handleSubmit, errors, control } = useForm<FormModel>({ defaultValues: model });

    // TODO: there's an issue with StyledRating
    /* eslint-disable react/jsx-sort-props */
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FlexLayout
                direction={'column'}
                spacing={1}
            >
                <Controller
                    as={(
                        <StyledRating
                            getLabelText={(value: number) => customIcons[value].label}
                            IconContainerComponent={IconContainer}
                            precision={1}
                        />
                    )}
                    control={control}
                    defaultValue={model.rating ?? null}
                    name={nameOf<FormModel>('rating')}
                    rules={{
                        required: true
                    }}
                />
                <TextField
                    error={Boolean(errors.description?.message)}
                    helperText={errors.description?.message}
                    inputRef={register({ required: 'A description is required.' })}
                    label={nameOf<FormModel>('description')}
                    multiline={true}
                    name={nameOf<FormModel>('description')}
                    variant={'outlined'}
                />
            </FlexLayout>
            <Button
                color={'primary'}
                type={'submit'}
            >
                {
                    isSubmitting
                        ? (
                            <CircularProgress
                                color={'inherit'}
                                size={28}
                            />
                        )
                        : 'Save'
                }
            </Button>
        </form>
    );
};

export default ReviewForm;
