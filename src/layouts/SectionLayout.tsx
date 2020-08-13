import { Grid, Theme } from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
    sectionPadding: {
        padding: theme.spacing(0, 1)
    }
}));

type SectionLayoutProps = {
    children: React.ReactNode;
    disableGutter: boolean;
    xs: GridSize;
    sm: GridSize;
    md: GridSize;
    lg: GridSize;
    xl: GridSize;
};

const SectionLayout: React.FunctionComponent<SectionLayoutProps> = ({
    children,
    disableGutter,
    xs = 'auto',
    sm = 'auto',
    md = 'auto',
    lg = 'auto',
    xl = 'auto'
}: SectionLayoutProps) => {
    const classes = useStyles();
    return (
        <Grid
            alignItems={'stretch'}
            className={disableGutter ? '' : classes.sectionPadding}
            container={true}
            direction={'row'}
            justify={'center'}
            spacing={0}
            wrap={'nowrap'}
        >
            <Grid
                item={true}
                lg={lg}
                md={md}
                sm={sm}
                xl={xl}
                xs={xs}
            >
                {children}
            </Grid>
        </Grid>
    );
};

export default SectionLayout;
