import { FlexLayout } from '@gjv/material-ui-adjunct'
import { TextField, Theme } from '@material-ui/core'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import { Rating, IconContainerProps, RatingProps } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { nameOf } from '../../lib/Utilities'
import { IReviewModel } from './index'

const StyledRating: React.ComponentType<RatingProps> = withStyles((theme: Theme) => ({
    iconFilled: {
        color: theme.palette.primary.main,
    },
    iconHover: {
        color: theme.palette.primary.light,
    },
}))(Rating)

const customIcons: { [index: string]: { icon: React.ReactElement; label: string } } = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: 'Very Satisfied',
    },
}

function IconContainer(props: IconContainerProps): JSX.Element {
    const { value, ...other } = props
    return <span {...other}>{customIcons[value].icon}</span>
}

type FormModel = IReviewModel

const ReviewFormFields: React.FunctionComponent = () => {
    const methods = useFormContext<FormModel>()

    /* eslint-disable react/jsx-sort-props */
    return (
        <FlexLayout
            direction={'column'}
            spacing={2}
        >
            <Controller
                as={(
                    <StyledRating
                        IconContainerComponent={IconContainer}
                        getLabelText={(value: number) => customIcons[value].label}
                        precision={1}
                    />
                )}
                control={methods.control}
                defaultValue={methods.watch(nameOf<FormModel>('rating')) ?? null}
                name={nameOf<FormModel>('rating')}
                rules={{
                    required: true,
                }}
            />
            <TextField
                error={Boolean(methods.errors.description?.message)}
                helperText={methods.errors.description?.message}
                inputRef={methods.register({ required: 'A description is required.' })}
                label={nameOf<FormModel>('description')}
                multiline={true}
                name={nameOf<FormModel>('description')}
                variant={'outlined'}
            />
        </FlexLayout>
    )
    /* eslint-enable react/jsx-sort-props */
}

export default ReviewFormFields
