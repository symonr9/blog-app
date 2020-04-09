import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { colors } from "./assets/common";
import { makeStyles } from "@material-ui/core/styles";

import { Provider } from "react-redux";
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

const routes = [
  { path: "/profile", name: "My Profile", Component: Profile, bgType: 1 },
  { path: "/:type/:urlId/edit", name: "Edit", Component: Edit, bgType: 1 },
  { path: "/:type/:urlId", name: "Single", Component: Single, bgType: 1 },
  { path: "/poetry", name: "Poetry", Component: Poetry, bgType: 1 },
  { path: "/quotes", name: "Quotes", Component: Quotes, bgType: 1 },
  { path: "/prose", name: "Prose", Component: Prose, bgType: 1 },
  { path: "/create", name: "Create", Component: Create, bgType: 1 },
  { path: "/login", name: "Login", Component: Login, bgType: 1 },
  { path: "/signup", name: "Signup", Component: Signup, bgType: 1 },
  { path: "/", name: "Home", Component: Home, bgType: 1 }
];

const useStyles = makeStyles({
  //One color header, other color base
  bgOne: {
    background: "linear-gradient(to bottom, " 
    + colors[1] + ","
    + colors[1] + " 25%,"  
    + colors[3] + " 25%" 
    + ")"
  },
  //Three color, three striped
  bgTwo: {
    background: "linear-gradient(to bottom, " 
    + colors[1] + ","
    + colors[1] + " 15%," 
    + colors[2] + " 15%," 
    + colors[2] + " 30%," 
    + colors[3] + " 30%" 
    + ")"
  },
  //All base
  bgThree: {
    background: colors[3]
  },
});

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar />
        <Switch>
          {routes.map(({ path, Component, bgType }) => (
            <Route key={path} path={path}>
              <div className={((bgType == 1) && classes.bgOne) 
                           || ((bgType == 2) && classes.bgTwo)
                           || ((bgType == 3) && classes.bgThree)
                           }>    
                <Component />
              </div>
            </Route>
          ))}
        </Switch>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
