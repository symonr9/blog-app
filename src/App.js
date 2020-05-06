/***********************************************************************
 * File Name: App.js
 * Description: This is the root component that is rendered
 * for the application. Here, react-router-dom routes and
 * components are defined. The background is defined here as well.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
/**********************************************************************/


/* Project Imports ****************************************************/
import { fonts, colors, useCommonStyles } from "./assets/common";

import store from "./services/redux/store";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Poetry from "./pages/Poetry/Poetry";
import Quotes from "./pages/Quotes/Quotes";
import Prose from "./pages/Prose/Prose";
import Single from "./pages/Single/Single";
import Edit from "./pages/Edit/Edit";
import Create from "./pages/Create/Create";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Admin from "./pages/Admin/Admin";
import Redirect from "./pages/Redirect/Redirect";

import Comments from "./components/Comments";

import logo from "./assets/logo.svg";
import share from "./assets/share.jpg";
import homescreen from "./assets/homescreen.jpg";
import addhomescreen from "./assets/addhomescreen.jpg";

//1, 4, 7
import back from "./assets/back1.PNG";
import { isIos, isInStandaloneMode } from './services/utils';
/**********************************************************************/

const routes = [
  { path: "/profile/:username", 
    name: "My Profile", 
    Component: Profile, 
    bgType: 1
  },
  { path: "/:type/:urlId/edit", 
    name: "Edit", 
    Component: Edit, 
    bgType: 3 
  },
  { path: "/:type/:urlId", 
    name: "Single", 
    Component: Single, 
    bgType: 1
  },
  { path: "/poetry", 
    name: "Poetry", 
    Component: Poetry, 
    bgType: 1 
  },
  { path: "/quotes", 
    name: "Quotes", 
    Component: Quotes, 
    bgType: 1 
  },
  { path: "/prose", 
    name: "Prose", 
    Component: Prose, 
    bgType: 1 
  },
  { path: "/create", 
    name: "Create", 
    Component: Create, 
    bgType: 3
  },
  { path: "/login", 
    name: "Login", 
    Component: Login, 
    bgType: 1 
  },
  { path: "/signup", 
    name: "Signup", 
    Component: Signup, 
    bgType: 1 
  },
  { path: "/admin", 
    name: "Admin", 
    Component: Admin, 
    bgType: 3
  },
  { path: "/redirect", 
    name: "Redirect", 
    Component: Redirect, 
    bgType: 1 
  },
  { path: "/", 
    name: "Home", 
    Component: Home, 
    bgType: 1
  }
];

const useStyles = makeStyles({
  //One color header, other color base
  bgOne: {
    background: `url(${back}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    /*
    background: "linear-gradient(to bottom, " 
    + colors[1] + ","
    + colors[1] + " 25%,"
    + colors[2] + " 25%,"
    + colors[2] + " 35%,"  
    + colors[3] + " 35%" 
    + ")",
    fontFamily: fonts[0],
    "& h1, h2": {
      color: colors[5] + " !important",
      fontFamily: fonts[1]
    },
    "& span": {
      color: colors[4]
    }
    */
  },
  //One color small header, other color base
  bgTwo: {
    background: "linear-gradient(to bottom, " 
    + colors[1] + ","
    + colors[1] + " 14%,"  
    + colors[3] + " 14%" 
    + ")",
    fontFamily: fonts[0],
    "& h1, h2": {
      color: colors[5] + " !important",
      fontFamily: fonts[1]
    },
    "& span": {
      color: colors[4]
    }
  },
  //Three color, three striped
  bgThree: {
    background: "linear-gradient(to bottom, " 
    + colors[1] + ","
    + colors[1] + " 15%," 
    + colors[2] + " 15%," 
    + colors[2] + " 30%," 
    + colors[4] + " 30%" 
    + ")",
    fontFamily: fonts[0],
    "& h1, h2": {
      color: colors[5] + " !important",
      fontFamily: fonts[1]
    },
    "& span": {
      color: colors[4]
    }
  },
  //All base
  bgFour: {
    background: colors[3],
    fontFamily: fonts[0],
    "& h1, h2": {
      color: colors[5] + " !important",
      fontFamily: fonts[1]
    },
    "& span": {
      color: colors[4]
    }
  },
  //Three color, three striped
  bgMobile: {
    background: colors[3],
    fontFamily: fonts[0],
    "& h1, h2": {
      color: colors[5] + " !important",
      fontFamily: fonts[1]
    },
    "& span": {
      color: colors[4]
    },
    height: '100em'
  },

  logo: {

  },
  shareImg: {
    width: '8em',
    height: '5em'
  },
  homescreenImg: {
    width: '20em',
    height: '4em'
  },
  addhomescreenImg: {
    width: '16em',
    height: '12em'
  }

});

/**********************************************************************
 * Function Name: App
 * Parameters: None
 * Description: Component for the entire application.
 * Notes: None
 **********************************************************************/
function App() {
  const classes = useStyles();
  const common = useCommonStyles();
  
  const isMobileBrowserRender = isIos() && !isInStandaloneMode();
  //const isMobileBrowserRender = false;

  return (
    <BrowserRouter>
      <Provider store={store}>
        {
          isMobileBrowserRender 
          ? <div className={classes.bgMobile}>
              {<span>
                <object type="image/svg+xml" className={classes.logo} data={logo}></object>
                <center>
                  <h1 className={common.altFont}>Entering Symon's Blog...</h1>
                  <p>Please follow these steps to install the app on your mobile device:</p>
                  <ul>
                    <li>Step 1: Click on your device's share button.
                      <br/><br/>
                      <img src={share} className={classes.shareImg} />
                    </li>
                    
                    <li>Step 2: Scroll down and select "Add to Home Screen".
                      <br/><br/>
                      <img src={homescreen} className={classes.homescreenImg} />
                    </li>

                    <li>Step 3: Click "Add" on the Top Right.
                      <br/><br/>
                      <img src={addhomescreen} className={classes.addhomescreenImg} />
                    </li>

                    <li>Step 4: Check the app out on your home page!
                    </li>
                  </ul>
                </center>
              </span>}
            </div> 
          : <span>
              <NavBar />
              <Switch>
                {routes.map(({ path, Component, bgType, name }) => (
                  <Route key={path} path={path}>
                    <div className={((bgType === 1) && classes.bgOne) 
                                || ((bgType === 2) && classes.bgTwo)
                                || ((bgType === 3) && classes.bgThree)
                                || ((bgType === 4) && classes.bgFour)
                                }>    
                      <Component />
                    </div>
                    {name === "Single" && <div className={classes.bgFour}><Comments /></div>}
                  </Route>
                ))}
              </Switch>
              <Footer />
            </span>
        }
      </Provider>
    </BrowserRouter>
  );
}

export default App;
