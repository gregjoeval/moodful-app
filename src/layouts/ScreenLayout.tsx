import { AppBar, Theme, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import SectionLayout from './SectionLayout';

const useStyles = makeStyles((theme: Theme) => ({
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
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4)
        },
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(7),
            paddingBottom: theme.spacing(7)
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(9),
            paddingBottom: theme.spacing(9)
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: theme.spacing(11),
            paddingBottom: theme.spacing(11)
        },
        [theme.breakpoints.up('xl')]: {
            paddingTop: theme.spacing(13),
            paddingBottom: theme.spacing(13)
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
    backgroundClassName?: string | null;
    disableGutter?: boolean;
};

const ScreenLayout: React.FunctionComponent<ScreenLayoutProps> = ({ children, footer, header, backgroundClassName, disableGutter = false }: ScreenLayoutProps) => {
    const classes = useStyles();
    return (
        <Fragment>
            {header}
            <main
                className={clsx([
                    backgroundClassName || classes.mainBackgroundColor,
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
