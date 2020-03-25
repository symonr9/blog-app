import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { stack as Menu } from "react-burger-menu";

import { Paper, Grow, Button, TextField, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import HomeRounded from "@material-ui/icons/HomeRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import FormatQuoteRoundedIcon from "@material-ui/icons/FormatQuoteRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';

export const routes = [
  { path: "/", name: "Home", icon: <HomeRounded /> },
  { path: "/create", name: "Create", icon: <AddCircleOutlineRoundedIcon /> },
  { path: "/poetry", name: "Poetry", icon: <MenuBookRoundedIcon /> },
  { path: "/login", name: "Login", icon: <SupervisorAccountRoundedIcon/> },
  { path: "/signup", name: "Signup", icon: <SupervisorAccountRoundedIcon/> },
  { path: "/profile", name: "Profile", icon: <PersonRoundedIcon /> },
  { path: "/phrases", name: "Phrases", icon: <FormatQuoteRoundedIcon /> }
];

const useStyles = makeStyles({
  navBarDiv: {
    position: "fixed",
    top: "0",
    margin: "1em",
    "& a": {
      margin: "0.5em",
      textDecoration: "none",
      color: "white",
      "& :hover": {
        color: "black"
      }
    }
  },
  mobileNavBarDiv: {
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: "1em",
    "& a": {
      margin: "0.5em",
      textDecoration: "none",
      color: "white",
      "& :hover": {
        color: "black"
      }
    }
  },
  iconDiv: {}
});

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "2em",
    height: "2em",
    marginBottom: "3em",
    marginLeft: "1em"
  },
  bmBurgerBars: {
    background: "#373a47"
  },
  bmBurgerBarsHover: {
    background: "#a90000"
  },
  bmCrossButton: {
    height: "24px",
    width: "24px"
  },
  bmCross: {
    background: "#bdc3c7"
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%"
  },
  bmMenu: {
    background: "white",
    fontSize: "1.15em",
    overflow: "hidden"
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    marginTop: "2em"
  },
  bmItem: {
    display: "inline-block",
    marginTop: "2em",
    textDecoration: "none"
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};

function NavBar() {
  const classes = useStyles();

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 768px)").addListener(handler);
  }, []);

  const body = (
    <div>
      {routes.map(({ path, name, icon }) => (
        <NavLink to={path}>
          <Button variant="outlined">
            {icon}
            {name}
          </Button>
        </NavLink>
      ))}
    </div>
  );

  return (
    <div>
      {(!isMobileView && <div className={classes.navBarDiv}>{ body }</div>) ||
        (isMobileView && (
          <div className={ classes.mobileNavBarDiv }>
          <Menu styles={styles} width={150} isOpen={isOpenMobileMenu} >
            { body }
          </Menu>
          </div>
        ))}
    </div>
  );
}

export default NavBar;
