import React, { useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { GAME_ROUTES } from '../routes/gameRoutes';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        backgroundColor: lighten(theme.palette.warning.light, 0.8)
    },
    navLink: {
        fontWeight: 700,
        color: theme.palette.secondary.main,
        '& a': {
            color: 'inherit',
            textDecoration: 'none',
            fontWeight: 'inherit'
        }
    },
    link: {
        fontSize: 14,
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: theme.palette.primary.main
    }
}));

export function AppHeader() {
    const classes = useStyles();
    const [anchorEl, setAnchor] = useState(null);
    const games = (GAME_ROUTES).map(route =>
        <MenuItem key={ route.pathFragment } onClick={handleClose}>
            <Link className={classes.link} to={ '/games/' + route.pathFragment }>
                { route.title }
            </Link>
        </MenuItem>
    );

    function handleOpen(event) {
        setAnchor(event.currentTarget);
    }

    function handleClose() {
        setAnchor(null);
    }

    return (
        <Box className={ classes.root }>
            <Container>
                <Button className={classes.navLink}>
                    <Link to='/'>
                        Home
                    </Link>
                </Button>
                <Button className={classes.navLink} onClick={ handleOpen }>
                    Games
                </Button>
                <Menu keepMounted
                      anchorEl={anchorEl}
                      onClose={ handleClose }
                      open={Boolean(anchorEl)}>
                    <MenuItem onClick={handleClose}>
                        <Link className={classes.link} to='/games/'>
                            All Games
                        </Link>
                    </MenuItem>
                    { games }
                </Menu>
            </Container>
        </Box>
    );
}