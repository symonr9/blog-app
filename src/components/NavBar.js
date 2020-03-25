import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { Paper, Grow, Button, TextField, FormControl } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import HomeRounded from '@material-ui/icons/Home';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

export const routes = [
    { path: '/', name: 'Home', icon: <HomeRounded /> },
    { path: '/profile', name: 'Profile', icon: <PersonRoundedIcon /> }
  ]
  

const useStyles = makeStyles({
	navBarDiv: {
        marginTop: '0.5em',
        marginBottom: '0.75em',
        '& a': {
            margin: '0.5em',
            textDecoration: 'none',
            color: 'white',
            '& :hover': {
                color: 'black'
            }
        }
    },
    iconDiv: {
    }
});


function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.navBarDiv}>
            {routes.map(({ path, name, icon }) => (
            <NavLink to={path}>
                <Button variant="outlined">
                   {icon}{name}
                </Button>
            </NavLink>
            ))}
        </div>
    );

}

export default NavBar;
