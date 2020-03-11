import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, makeStyles, Select, Tabs, Tab, AppBar, Toolbar, Drawer, Button, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PublicIcon from '@material-ui/icons/Public';
import Green from '@material-ui/core/colors/green';
import LightBlue from '@material-ui/core/colors/lightBlue';
import Register from '../register/register'
import RegisterWithPhone from '../register/registerWithPhone';
import MainBlog from '../mainBlog.js/mainBlog'
import PageNotFound from '../../UI/404PageNotFound/404PageNotFound'
import AllCountries from '../allCountries/allCountries'
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(20),
    },
    title: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flex: '1 0 auto',
        margin: theme.spacing(1),
    },
    list: {
        width: 250,
    },
}));

const Blog = (props) => {
    const classes = useStyles();

    const [state, setState] = useState({
        left: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List style={{ textDecoration: 'none', color: "inherit" }} component={Link} to="/AllCountries">
                <ListItem button>
                    <ListItemIcon>
                        <PublicIcon />
                    </ListItemIcon>
                    <ListItemText primary="All Countries" />
                </ListItem>
            </List>
            {
                props.auth ? null :
                    <List style={{ textDecoration: 'none', color: "inherit" }} component={Link} to="/phoneRegister">
                        <ListItem button>
                            <ListItemIcon>
                                <PersonAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="SignUp" />
                        </ListItem>
                    </List>
            }
        </div>
    );

    const menuBarForMobile = (
        <>
            <Hidden smUp>
                <Button onClick={toggleDrawer('left', true)}><MenuIcon style={{ color: Green[300] }} /></Button>
                <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                    {sideList('left')}
                </Drawer>
            </Hidden>
        </>
    );

    const desktopMenu = (
        <Hidden xsDown>
            <Button style={{ color: Green[300] }} component={Link} to="/AllCountries">All Countries</Button>
            {props.auth ? null : <Button style={{ color: Green[300] }} component={Register}>SignUp</Button>}
        </Hidden>
    );

    return (
        <>
            <AppBar position="sticky" style={{ background: LightBlue[900] }}>
                <Toolbar>
                    {menuBarForMobile}
                    <Button style={{ color: Green[300], fontSize: '20px' }} component={Link} to="/">Around the World</Button>
                    {desktopMenu}
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path="/phoneRegister" exact component={RegisterWithPhone} />
                <Route path="/" exact component={MainBlog} />
                <Route path="/AllCountries" exact component={AllCountries} />
                <Route component = {PageNotFound}/>
            </Switch>

        </>
    );
}

Blog.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};



const mapStateToProps = state => {
    console.log('state', state)
    return {
        auth: state.auth.authenticated,
        username: state.auth.username
    }
}

export default withWidth()(connect(mapStateToProps)(Blog));

