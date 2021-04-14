import { Stack } from '@gjv/material-ui-adjunct'
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
    footer: {
        top: 'auto',
        bottom: 0,
    },
}))

type FooterLayoutProps = {
    alignContent?: GridContentAlignment;
    alignItems?: GridItemsAlignment;
    children: Array<Node> | Node;
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

const FooterLayout: React.FunctionComponent<FooterLayoutProps> = ({
    alignContent,
    alignItems,
    children,
    direction = 'row',
    justify,
    spacing = 1,
    wrap = 'wrap',
    xs = 12,
    sm = 12,
    md = 9,
    lg = 7,
    xl = 5,
}: FooterLayoutProps) => {
    const classes = useStyles()
    return (
        <AppBar
            className={classes.footer}
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
                    <Stack
                        alignContent={alignContent}
                        alignItems={alignItems}
                        direction={direction}
                        justify={justify}
                        spacing={spacing}
                        wrap={wrap}
                    >
                        {children}
                    </Stack>
                </SectionLayout>
            </Toolbar>
        </AppBar>
    )
}

export default FooterLayout
