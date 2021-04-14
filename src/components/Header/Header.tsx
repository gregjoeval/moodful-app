import { useAuth0 } from '@auth0/auth0-react'
import { Stack } from '@gjv/material-ui-adjunct'
import { IconButton, Link, Tooltip, Typography } from '@material-ui/core'
import { Brightness2 as DarkThemeIcon, Brightness6 as LightThemeIcon } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { ConfigurationDuck } from '../../features/configuration'
import { ThemeDuck } from '../../features/theme'
import { HeaderLayout } from '../../layouts'
import ReviewsScreen from '../../screens/Reviews'
import TagsScreen from '../../screens/Tags'
import AccountMenu from './AccountMenu'

const Header: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const { isAuthenticated } = useAuth0()

    const configuration = useSelector(ConfigurationDuck.Selectors.selectModel)
    const themePaletteType = useSelector(ThemeDuck.Selectors.selectPaletteType)

    const [accountMenuAnchorElement, setAccountMenuAnchorElement] = useState<Element | null>(null)

    return (
        <HeaderLayout
            alignItems={'center'}
            justify={'space-between'}
        >
            <Stack
                alignItems={'center'}
                direction={'row'}
                spacing={1}
            >
                <Link
                    color={'textPrimary'}
                    component={RouterLink}
                    to={'/'}
                    variant={'h5'}
                >
                    {configuration.AppTitle}
                </Link>
                {
                    isAuthenticated && (
                        <Typography color={'textPrimary'}>
                            {'|'}
                        </Typography>
                    )
                }
                {
                    isAuthenticated && (
                        <Link
                            color={'textPrimary'}
                            component={RouterLink}
                            to={ReviewsScreen.Path}
                            variant={'body1'}
                        >
                            {ReviewsScreen.Name}
                        </Link>
                    )
                }
                {
                    isAuthenticated && (
                        <Typography color={'textPrimary'}>
                            {'|'}
                        </Typography>
                    )
                }
                {
                    isAuthenticated && (
                        <Link
                            color={'textPrimary'}
                            component={RouterLink}
                            to={TagsScreen.Path}
                            variant={'body1'}
                        >
                            {TagsScreen.Name}
                        </Link>
                    )
                }
            </Stack>
            <Stack
                alignItems={'center'}
                direction={'row'}
            >
                <Tooltip title={'Toggle light/dark theme'}>
                    <IconButton
                        onClick={() => dispatch(ThemeDuck.Actions.togglePaletteType(themePaletteType))}
                    >
                        {
                            themePaletteType === 'dark'
                                ? <DarkThemeIcon />
                                : <LightThemeIcon />
                        }
                    </IconButton>
                </Tooltip>
                <AccountMenu
                    anchorElement={accountMenuAnchorElement}
                    onClose={() => setAccountMenuAnchorElement(null)}
                    onOpen={(event) => setAccountMenuAnchorElement(event.currentTarget)}
                />
            </Stack>
        </HeaderLayout>
    )
}

export default Header
