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


import AddToHomescreen from 'react-add-to-homescreen';
/**********************************************************************/

/* Project Imports ****************************************************/
import { colors } from "./assets/common";

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

import Redirect from "./pages/Redirect/Redirect";
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
    bgType: 2 
  },
  { path: "/:type/:urlId", 
    name: "Single", 
    Component: Single, 
    bgType: 4
  },
  { path: "/poetry", 
    name: "Poetry", 
    Component: Poetry, 
    bgType: 3 
  },
  { path: "/quotes", 
    name: "Quotes", 
    Component: Quotes, 
    bgType: 3 
  },
  { path: "/prose", 
    name: "Prose", 
    Component: Prose, 
    bgType: 3 
  },
  { path: "/create", 
    name: "Create", 
    Component: Create, 
    bgType: 2 
  },
  { path: "/login", 
    name: "Login", 
    Component: Login, 
    bgType: 2 
  },
  { path: "/signup", 
    name: "Signup", 
    Component: Signup, 
    bgType: 2 
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
    background: "linear-gradient(to bottom, " 
    + colors[1] + ","
    + colors[1] + " 25%,"
    + colors[2] + " 25%,"
    + colors[2] + " 35%,"  
    + colors[3] + " 35%" 
    + ")",
    "& h1, h2": {
      color: colors[5] + " !important"
    },
    "& span": {
      color: colors[4]
    }
  },
  //One color small header, other color base
  bgTwo: {
    background: "linear-gradient(to bottom, " 
    + colors[1] + ","
    + colors[1] + " 14%,"  
    + colors[3] + " 14%" 
    + ")",
    "& h1, h2": {
      color: colors[5] + " !important"
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
    + colors[3] + " 30%" 
    + ")",
    "& h1, h2": {
      color: colors[5] + " !important"
    },
    "& span": {
      color: colors[4]
    }
  },
  //All base
  bgFour: {
    background: colors[3],
    "& h1, h2": {
      color: colors[5] + " !important"
    },
    "& span": {
      color: colors[4]
    }
  },

});

/**********************************************************************
 * Function Name: App
 * Parameters: None
 * Description: Component for the entire application.
 * Notes: None
 **********************************************************************/
function App() {
  const classes = useStyles();

  //Add to HomeScreen alert message that appears when iOS or Android
  //is used. When you add the app to the home screen, it becomes a PWA
  //and is installed for offline use on mobile devices.
  const handleAddToHomescreenClick = () => {
    alert(`
      1. Open Share menu
      2. Tap on "Add to Home Screen" button`);
  };

  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar />
        <Switch>
          {routes.map(({ path, Component, bgType }) => (
            <Route key={path} path={path}>
              <div className={((bgType === 1) && classes.bgOne) 
                           || ((bgType === 2) && classes.bgTwo)
                           || ((bgType === 3) && classes.bgThree)
                           || ((bgType === 4) && classes.bgFour)
                           }>    
                <Component />
              </div>
            </Route>
          ))}
        </Switch>
        <Footer />
        <AddToHomescreen onAddToHomescreenClick={handleAddToHomescreenClick} />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
