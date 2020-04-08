import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { slide as Menu } from "react-burger-menu";

import { Paper, Grow, Button, TextField, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import HomeRounded from "@material-ui/icons/HomeRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import FormatQuoteRoundedIcon from "@material-ui/icons/FormatQuoteRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';

import { colors, useCommonStyles } from "../assets/common";

export const routes = [
  { path: "/", name: "Home", icon: <HomeRounded /> },
  { path: "/create", name: "Create", icon: <AddCircleOutlineRoundedIcon /> },
  { path: "/poetry", name: "Poetry", icon: <MenuBookRoundedIcon /> },
  { path: "/quotes", name: "Quotes", icon: <FormatQuoteRoundedIcon /> },
  { path: "/prose", name: "Prose", icon: <DescriptionRoundedIcon />},
];

/*
  { path: "/login", name: "Login", icon: <SupervisorAccountRoundedIcon/> },
  { path: "/signup", name: "Signup", icon: <SupervisorAccountRoundedIcon/> },
  { path: "/profile", name: "Profile", icon: <PersonRoundedIcon /> },
*/

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

function NavBar() {
  const classes = useStyles();

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
  }, []);

  const body = (
    <div>
      {routes.map(({ path, name, icon }) => (
        <NavLink to={path} key={name}>
          <Button className={classes.navBtn} variant="contained">
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
          <Menu styles={styles} className={classes.removeFocus} width={150} isOpen={isOpenMobileMenu} >
            { body }
          </Menu>
          </div>
        ))}
    </div>
  );
}

export default NavBar;
