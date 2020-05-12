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

import { useHistory, useLocation } from "react-router-dom";
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
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';


import { slide as Menu } from "react-burger-menu";
/**********************************************************************/

/* Project Imports ****************************************************/
import { fonts, colors } from "../assets/common";

import { logoutUser } from "../services/redux/actions";

import logo from "../assets/logo.svg";
/**********************************************************************/

const useStyles = makeStyles({
  navBarDiv: {
    position: "fixed",
    top: "0.25em",
    margin: "1em",
    zIndex: '100000000 !important',
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
    marginBottom: '0.5em',
    color: colors[4],
    backgroundColor: colors[3],
  },
  mobileNavBtn: {
    marginTop: '1.25em',
    color: colors[4],
    backgroundColor: colors[3]
  },
  backBtn: {
    marginTop: '1em',
    marginLeft: '1em',
    color: colors[4],
    backgroundColor: colors[3],
    position: 'fixed',
  },
  logo: {
    width: '5em',
    height: '5em',
    position: 'fixed',
    marginBottom: '10em'
  },
  mobileLogo: {
    width: '5em',
    height: '5em',
    position: 'fixed',
    margin: '0 !important',
    marginTop: '2em !important',
    top: '0'
  },
  isScrolledDown: {
    animationName: '$scrolled-down-animation',
    animationDuration: '0.5s',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-in-out'
  },
  '@keyframes scrolled-down-animation': {
    '0%': {
      padding: '0em'
    },  
    '100%': {
      backgroundColor: colors[1],
      borderRadius: '1em',
      padding: '2em',
    }
  },
  isScrolledUp: {
    animationName: '$scrolled-up-animation',
    animationDuration: '0.5s',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-in-out'
  },
  '@keyframes scrolled-up-animation': {
    '0%': {
      backgroundColor: colors[1],
      borderRadius: '1em',
      padding: '2em'
    },  
    '100%': {
      padding: '0em'
    }
  },
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
    background: colors[5]
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
    background: "linear-gradient(to bottom, " 
    + colors[1] + ","
    + colors[1] + " 25%," 
    + colors[2] + " 25%," 
    + colors[2] + " 50%," 
    + colors[4] + " 50%" 
    + ")",
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

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!username;

  const history = useHistory();
  const dispatch = useDispatch();

  const isAdmin = username === "sy";
  /**********************************************************************/

  const classes = useStyles();


  /* Mobile View Handler ************************************************/
  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  const [isScrolledDown, setIsScrolledDown] = useState(window.scrollY > 100);

  //Adds a listener to re-render the component when the window width changes.
  useEffect(() => {
    const mobileHandler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(mobileHandler);

    const scrollHandler = e => setIsScrolledDown(window.scrollY > 100);
    window.addEventListener('scroll', scrollHandler);
  }, []);
  /**********************************************************************/

  
  /* Back Button Handling ************************************************/
  let location = useLocation();

  //The back button appears on the Single and Edit pages.
  const isBackBtn = ((location.pathname.split("/").length - 1) > 1);

  const handleBackBtnClick = () => {
    history.goBack();
  };
  /**********************************************************************/

  const handleLogoutBtnClick = () => {
    //Save login credentials into redux store for cross-application use.
    dispatch(logoutUser());

    //Redirect to home page.
    history.push("/");
  };

  //onClick needs to be defined for all the non-log out buttons to prevent warnings.
  const placeholderClick = () => {
  };

  const loggedInRoutes = [
    { path: "/create", name: "Create", icon: <AddCircleOutlineRoundedIcon />, isLogOut: false },
    { path: "/poetry", name: "Poetry", icon: <MenuBookRoundedIcon />, isLogOut: false },
    { path: "/quotes", name: "Quotes", icon: <FormatQuoteRoundedIcon />, isLogOut: false },
    { path: "/prose", name: "Prose", icon: <DescriptionRoundedIcon />, isLogOut: false },
    { path: "/profile/" + username, name: "Profile", icon: <PersonRoundedIcon />, isLogOut: false },
    { path: "/", name: "Logout", icon: <SupervisorAccountRoundedIcon/>, isLogOut: true },
  ];

  const loggedOutRoutes = [
    { path: "/poetry", name: "Poetry", icon: <MenuBookRoundedIcon /> },
    { path: "/quotes", name: "Quotes", icon: <FormatQuoteRoundedIcon /> },
    { path: "/prose", name: "Prose", icon: <DescriptionRoundedIcon />},
    { path: "/login", name: "Login", icon: <SupervisorAccountRoundedIcon/> },
    { path: "/signup", name: "Signup", icon: <SupervisorAccountRoundedIcon/> },
  ];

  //Font Family only works for inline styles for buttons :(
  const body = (
    <div>
      <NavLink to={"/"}>
        <Button>
          {<object type="image/svg+xml" className={!isMobileView ? classes.logo : classes.mobileLogo} data={logo}></object>}
        </Button>
      </NavLink>
      <span className={!isMobileView && (isScrolledDown ? classes.isScrolledDown : classes.isScrolledUp)}>
        <NavLink to={"/"}>
          <Button style={{ fontFamily: fonts[2] }} className={!isMobileView ? classes.navBtn : classes.mobileNavBtn} variant="contained">
            <HomeRounded />
            Home
          </Button>
        </NavLink>
        {isLoggedIn && (
          loggedInRoutes.map(({ path, name, icon, isLogOut }) => (
            <NavLink to={path} key={name}>
              <Button style={{ fontFamily: fonts[2] }} className={!isMobileView ? classes.navBtn : classes.mobileNavBtn} variant="contained" onClick={(isLogOut && handleLogoutBtnClick || placeholderClick)}>
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
              <Button style={{ fontFamily: fonts[2] }} className={!isMobileView ? classes.navBtn : classes.mobileNavBtn} variant="contained">
                {icon}
                {name}
              </Button>
            </NavLink>
          ))
        )
        }

        {isAdmin && (<NavLink to={"/admin"}>
          <Button style={{ fontFamily: fonts[2] }} className={!isMobileView ? classes.navBtn : classes.mobileNavBtn} variant="contained">
            <PersonRoundedIcon />
            Admin
          </Button>
        </NavLink>)
        }
      </span>
    </div>
  );

  return (
    <div>
      {(!isMobileView && <div className={classes.navBarDiv}>{ body }</div>) ||
        (isMobileView && (
          !isBackBtn && 
          (
          <div className={ classes.mobileNavBarDiv }>
          <Menu styles={styles} className={classes.removeFocus} width={150} isOpen={isOpenMobileMenu} >
            { body }
          </Menu>
          </div>
          )
          ||
          isBackBtn && (
            <Button className={classes.backBtn} variant="contained" onClick={handleBackBtnClick}>
              {<ArrowBackRoundedIcon />}
            </Button>
            )
        ))}
    </div>
  );
}

export default NavBar;
