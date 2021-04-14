import { Stack } from '@gjv/material-ui-adjunct'
import { CircularProgress, Theme, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import ScreenLayout from '../layouts/ScreenLayout'
import { isInDevBuildEnv } from '../lib/Utilities'

const useStyles = makeStyles<Theme>((theme) => ({
    progress: {
        margin: theme.spacing(2),
    },
    container: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
}))

interface ISpinnerProps {
    header?: React.ReactElement<typeof Toolbar>;
    debugMessage?: string;
}

const Spinner: React.FunctionComponent<ISpinnerProps> = ({ header, debugMessage }) => {
    const classes = useStyles()
    return (
        <ScreenLayout header={header}>
            <Stack
                alignItems={'center'}
                direction={'column'}
                spacing={3}
            >
                <div className={classes.container}>
                    <CircularProgress
                        className={classes.progress}
                        size={100}
                    />
                    <Typography
                        align={'center'}
                        variant={'h6'}
                    >
                        {isInDevBuildEnv() ? debugMessage : ''}
                    </Typography>
                </div>
            </Stack>
        </ScreenLayout>
    )
}

export default Spinner
