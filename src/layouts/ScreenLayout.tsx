import { Theme, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import SectionLayout from './SectionLayout';

const useStyles = makeStyles<Theme>((theme) => ({
    mainBackgroundColor: {
        backgroundColor: theme.palette.background.default
    },
    hasHeader: {
        paddingTop: theme.spacing(7)
    },
    hasFooter: {
        paddingBottom: theme.spacing(7)
    },
    screenPadding: {
        [theme.breakpoints.up('xs')]: {
            padding: theme.spacing(4, 0)
        },
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(7, 0)
        },
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(9, 0)
        },
        [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(11, 0)
        },
        [theme.breakpoints.up('xl')]: {
            padding: theme.spacing(13, 0)
        }
    },
    header: {
        top: 0,
        bottom: 'auto'
    },
    footer: {
        top: 'auto',
        bottom: 0
    }
}));

type ScreenLayoutProps = {
    children: React.ReactNode;
    footer?: React.ReactElement<typeof Toolbar>;
    header?: React.ReactElement<typeof Toolbar>;
    backgroundClassName?: string;
    disableGutter?: boolean;
};

const ScreenLayout: React.FunctionComponent<ScreenLayoutProps> = ({ children, footer, header, backgroundClassName, disableGutter = false }: ScreenLayoutProps) => {
    const classes = useStyles();
    return (
        <Fragment>
            {header}
            <main
                className={clsx([
                    backgroundClassName ?? classes.mainBackgroundColor,
                    Boolean(header) && classes.hasHeader,
                    Boolean(footer) && classes.hasFooter
                ])}
                id={'mainContent'}
            >
                <div className={classes.screenPadding}>
                    <SectionLayout
                        disableGutter={disableGutter}
                        lg={9}
                        md={11}
                        sm={12}
                        xl={7}
                        xs={12}
                    >
                        {children}
                    </SectionLayout>
                </div>
            </main>
            {footer}
        </Fragment>
    );
};

export default ScreenLayout;
