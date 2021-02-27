import { FlexLayout } from '@gjv/material-ui-adjunct'
import { AppBar, Toolbar } from '@material-ui/core'
import {
    GridContentAlignment,
    GridDirection,
    GridItemsAlignment,
    GridJustification,
    GridSize, GridSpacing, GridWrap,
} from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import SectionLayout from './SectionLayout'

const useStyles = makeStyles(() => ({
    header: {
        top: 0,
        bottom: 'auto',
    },
}))

type HeaderLayoutProps = {
    alignContent?: GridContentAlignment;
    alignItems?: GridItemsAlignment;
    direction?: GridDirection;
    justify?: GridJustification;
    spacing?: GridSpacing;
    wrap?: GridWrap;
    xs?: GridSize;
    sm?: GridSize;
    md?: GridSize;
    lg?: GridSize;
    xl?: GridSize;
}

const HeaderLayout: React.FunctionComponent<HeaderLayoutProps> = ({
    alignContent,
    alignItems,
    children,
    direction = 'row',
    justify,
    spacing = 1,
    wrap = 'wrap',
    xs = 12,
    sm = 12,
    md = 12,
    lg = 10,
    xl = 8,
}) => {
    const classes = useStyles()
    return (
        <AppBar
            className={classes.header}
            color={'primary'}
            position={'fixed'}
        >
            <Toolbar>
                <SectionLayout
                    disableGutter={true}
                    lg={lg}
                    md={md}
                    sm={sm}
                    xl={xl}
                    xs={xs}
                >
                    <FlexLayout
                        alignContent={alignContent}
                        alignItems={alignItems}
                        direction={direction}
                        justify={justify}
                        spacing={spacing}
                        wrap={wrap}
                    >
                        {children}
                    </FlexLayout>
                </SectionLayout>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderLayout
