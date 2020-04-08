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
import Prose from "./pages/Prose/Prose";
import Single from "./pages/Single/Single";
import Edit from "./pages/Edit/Edit";
import Create from "./pages/Create/Create";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

const routes = [
  { path: "/profile", name: "My Profile", Component: Profile },
  { path: "/:type/:urlId/edit", name: "Edit", Component: Edit },
  { path: "/:type/:urlId", name: "Single", Component: Single },
  { path: "/poetry", name: "Poetry", Component: Poetry },
  { path: "/quotes", name: "Quotes", Component: Quotes },
  { path: "/prose", name: "Prose", Component: Prose },
  { path: "/create", name: "Create", Component: Create },
  { path: "/login", name: "Login", Component: Login },
  { path: "/signup", name: "Signup", Component: Signup },
  { path: "/", name: "Home", Component: Home }
];


const useStyles = makeStyles({
  componentDiv: {
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
