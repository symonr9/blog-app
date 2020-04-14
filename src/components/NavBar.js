/***********************************************************************
 * File Name: NavBar.js
 * Description: Component for the NavBar. This component is rendered on
 * each page. Support for mobile view using a hamburger menu has been 
 * implemented as well. The routes defined here should reflect the routes
 * defined in the App.js (but not necessarily the other way around).
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import HomeRounded from "@material-ui/icons/HomeRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import FormatQuoteRoundedIcon from "@material-ui/icons/FormatQuoteRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';

import { slide as Menu } from "react-burger-menu";
/**********************************************************************/

/* Project Imports ****************************************************/
import { colors } from "../assets/common";

import { logoutUser } from "../services/redux/actions";
/**********************************************************************/


const loggedInRoutes = [
  { path: "/", name: "Home", icon: <HomeRounded />, isLogOut: false },
  { path: "/create", name: "Create", icon: <AddCircleOutlineRoundedIcon />, isLogOut: false },
  { path: "/poetry", name: "Poetry", icon: <MenuBookRoundedIcon />, isLogOut: false },
  { path: "/quotes", name: "Quotes", icon: <FormatQuoteRoundedIcon />, isLogOut: false },
  { path: "/prose", name: "Prose", icon: <DescriptionRoundedIcon />, isLogOut: false },
  { path: "/profile", name: "Profile", icon: <PersonRoundedIcon />, isLogOut: false },
  { path: "/", name: "Logout", icon: <SupervisorAccountRoundedIcon/>, isLogOut: true },
];

const loggedOutRoutes = [
  { path: "/", name: "Home", icon: <HomeRounded /> },
  { path: "/poetry", name: "Poetry", icon: <MenuBookRoundedIcon /> },
  { path: "/quotes", name: "Quotes", icon: <FormatQuoteRoundedIcon /> },
  { path: "/prose", name: "Prose", icon: <DescriptionRoundedIcon />},
  { path: "/login", name: "Login", icon: <SupervisorAccountRoundedIcon/> },
  { path: "/signup", name: "Signup", icon: <SupervisorAccountRoundedIcon/> },
];

const useStyles = makeStyles({
  navBarDiv: {
    position: "fixed",
    top: "0",
    margin: "1em",
    "& a": {
      margin: "0.5em",
      textDecoration: "none",
      color: colors[0],
      "& :hover": {
        color: colors[4]
      }
    }
  },
  mobileNavBarDiv: {
    overflow: "hidden",
    "& a": {
      margin: "0.5em",
      textDecoration: "none",
      color: colors[0],
      "& :hover": {
        color: colors[4]
      }
    }
  },
  removeFocus: {
    "& :focus": {
      outline: "none !important",
      boxShadow: "none"
    },
    "& :active": {
      outline: "none !important",
      boxShadow: "none"
    }
  },
  navBtn: {
    marginBottom: '1em',
    color: colors[4],
    backgroundColor: colors[3]
  }
});

//Styles have to be defined like this for the hamburger menu.
var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "2em",
    height: "2em",
    marginBottom: "3em",
    marginLeft: "1em",
    marginTop: "1em",
  },
  bmBurgerBars: {
    background: colors[2]
  },
  bmBurgerBarsHover: {
    background: colors[3]
  },
  bmCrossButton: {
    height: "24px",
    width: "24px"
  },
  bmCross: {
    background: colors[4]
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%"
  },
  bmMenu: {
    background: "linear-gradient(to bottom," + colors[1] + " 20%," + colors[3] + " 80%)",
    fontSize: "1.15em",
    overflow: "hidden",
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmItemList: {
    color: colors[1],
    padding: "0.8em",
    marginTop: "2em"
  },
  bmItem: {
    display: "inline-block",
    marginTop: "2em",
    textDecoration: "none",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};


/**********************************************************************
 * Function Name: NavBar
 * Parameters: None
 * Description: Component for NavBar. This component is rendered on
 * each page. Support for mobile view using a hamburger menu has been 
 * implemented as well. 
 * Notes: None
 **********************************************************************/
function NavBar() {
  /* Authentication Handling ********************************************/
  const username = useSelector(state => state.username);
  console.log("User logged in: ", username);
  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!username;

  const history = useHistory();
  const dispatch = useDispatch();
  /**********************************************************************/

  const classes = useStyles();


  /* Mobile View Handler ************************************************/
  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  //Adds a listener to re-render the component when the window width changes.
  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
  }, []);
  /**********************************************************************/

  const logout = () => {
    //Save login credentials into redux store for cross-application use.
    dispatch(logoutUser());

    //Redirect to home page.
    history.push("/");
  };

  const body = (
    <div>
      {isLoggedIn && (
        loggedInRoutes.map(({ path, name, icon, isLogOut }) => (
          <NavLink to={path} key={name}>
            <Button className={classes.navBtn} variant="contained" onClick={(isLogOut && logout)}>
              {icon}
              {name}
            </Button>
          </NavLink>
        ))
      )
      ||
      !isLoggedIn && (
        loggedOutRoutes.map(({ path, name, icon }) => (
          <NavLink to={path} key={name}>
            <Button className={classes.navBtn} variant="contained">
              {icon}
              {name}
            </Button>
          </NavLink>
        ))
      )
      }
    </div>
  );

  return (
    <div>
      {(!isMobileView && <div className={classes.navBarDiv}>{ body }</div>) ||
        (isMobileView && (
          <div className={ classes.mobileNavBarDiv }>
          <Menu styles={styles} className={classes.removeFocus} width={150} isOpen={isOpenMobileMenu} >
            { body }
          </Menu>
          </div>
        ))}
    </div>
  );
}

export default NavBar;
