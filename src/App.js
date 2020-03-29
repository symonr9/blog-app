import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import { makeStyles } from "@material-ui/core/styles";

import { Provider } from "react-redux";
import store from "./services/redux/store";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Poetry from "./pages/Poetry/Poetry";
import Quotes from "./pages/Quotes/Quotes";
import Create from "./pages/Create/Create";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

//import routes from "./data/routes";
const routes = [
  { path: "/profile", name: "My Profile", Component: Profile },
  { path: "/poetry", name: "Poetry", Component: Poetry },
  { path: "/quotes", name: "Quotes", Component: Quotes },
  { path: "/create", name: "Create", Component: Create },
  { path: "/login", name: "Login", Component: Login },
  { path: "/signup", name: "Signup", Component: Signup },
  { path: "/", name: "Home", Component: Home }
];


const useStyles = makeStyles({
  componentDiv: {
    background: "linear-gradient(to bottom, #3359ae 4%, #34b09b 20%, #ebe5d9 50%)",
    animation: `$effect`,
    animationDuration: '2000ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease',
    animationFillMode: 'forwards',
  },
  "@keyframes effect": {
    /*
    "50%": {
      background: "linear-gradient(to bottom, #3359ae 17%, #34b09b 30%, #ebe5d9 38%)",
      //background: 'green',
    },
    "100%": {
      background: "linear-gradient(to bottom, #3359ae 4%, #34b09b 20%, #ebe5d9 50%)",
      //background: 'purple',
    },
    */
    
    "0%": {
      background: "linear-gradient(to bottom, #3359ae 4%, #34b09b 20%, #ebe5d9 50%)",
      //background: 'blue',
    },
    "10%": {
      background: "linear-gradient(to bottom, #3359ae 5%, #34b09b 21%, #ebe5d9 49%)",
      //background: 'red',
    },
    "20%": {
      background: "linear-gradient(to bottom, #3359ae 6%, #34b09b 22%, #ebe5d9 48%)",
      //background: 'red',
    },
    "30%": {
      background: "linear-gradient(to bottom, #3359ae 7%, #34b09b 23%, #ebe5d9 49%)",
      //background: 'red',
    },
    "40%": {
      background: "linear-gradient(to bottom, #3359ae 8%, #34b09b 24%, #ebe5d9 46%)",
      //background: 'green',
    },
    "50%": {
      background: "linear-gradient(to bottom, #3359ae 7%, #34b09b 23%, #ebe5d9 47%)",
      //background: 'green',
    },
    "60%": {
      background: "linear-gradient(to bottom, #3359ae 8%, #34b09b 24%, #ebe5d9 46%)",
      //background: 'green',
    },
    "70%": {
      background: "linear-gradient(to bottom, #3359ae 7%, #34b09b 23%, #ebe5d9 47%)",
      //background: 'green',
    },
    "80%": {
      background: "linear-gradient(to bottom, #3359ae 6%, #34b09b 22%, #ebe5d9 48%)",
      //background: 'red',
    },
    "90%": {
      background: "linear-gradient(to bottom, #3359ae 5%, #34b09b 21%, #ebe5d9 49%)",
      //background: 'yellow',
    },
    "100%": {
      background: "linear-gradient(to bottom, #3359ae 4%, #34b09b 20%, #ebe5d9 50%)",
      //background: 'purple',
    },
    
  },
});

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar />
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path}>
              <div className={classes.componentDiv}>
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
