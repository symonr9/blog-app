import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import { Provider } from "react-redux";
import store from "./services/redux/store";

import { CSSTransition } from "react-transition-group";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Poetry from "./pages/Poetry";

//import routes from "./data/routes";
export const routes = [
  { path: '/profile', name: 'My Profile', Component: Profile },
  { path: '/poetry', name: 'Poetry', Component: Poetry},
  { path: '/', name: 'Home', Component: Home },
]


function App() {
  //const [isMobileView, setIsMobileView] = useState(window.matchMedia("(max-width: 768px)").matches);
  //const [isMobileView, setIsMobileView] = useState(false);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar/>
        <Switch>
        {routes.map(({ path, Component }) => (
            <Route key={path} path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={10000}
                  unmountOnExit
                  appear
                >
                  <Component />
                </CSSTransition>
              )}
            </Route>
          ))}
        </Switch>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}
/*
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={10000}
                  unmountOnExit
                  appear
                >
                  <Component />
                </CSSTransition>
              )}
            </Route>
          ))}*/

export default App;
