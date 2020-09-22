import { useAuth0 } from '@auth0/auth0-react';
import { Button, IconButton, MenuItem, Menu } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import React from 'react';
import ReviewsScreen from '../../screens/Reviews';

type AccountMenuProps = {
    anchorElement: Element | null;
    id?: string;
    onClose: React.MouseEventHandler;
    onOpen: React.MouseEventHandler;
};

const AccountMenu: React.FunctionComponent<AccountMenuProps> = ({ anchorElement, id = 'account-menu-id', onClose, onOpen }) => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return isAuthenticated
        ? (
            <React.Fragment>
                <IconButton
                    aria-controls={'account-menu-id'}
                    aria-haspopup={'true'}
                    onClick={onOpen}
                >
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorElement}
                    id={id}
                    keepMounted={true}
                    open={Boolean(anchorElement)}
                    onClose={onClose}
                >
                    <MenuItem>
                        {user.nickname ?? user.name}
                    </MenuItem>
                    <MenuItem
                        button={true}
                        onClick={() => logout({ returnTo: window.location.origin })}
                    >
                        {'Logout'}
                    </MenuItem>
                </Menu>
            </React.Fragment>
        )
        : (
            <Button onClick={async () => loginWithRedirect({ redirectUri: `${window.location.origin}${ReviewsScreen.Path}` })}>
                {'Login'}
            </Button>
        );
};

export default AccountMenu;
