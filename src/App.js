import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import { Provider } from "react-redux";
import store from "./services/redux/store";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Poetry from "./pages/Poetry";
import Phrases from "./pages/Phrases";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

//import routes from "./data/routes";
const routes = [
  { path: '/profile', name: 'My Profile', Component: Profile },
  { path: '/poetry', name: 'Poetry', Component: Poetry },
  { path: '/phrases', name: 'Phrases', Component: Phrases },
  { path: '/create', name: 'Create', Component: Create },
  { path: '/login', name: 'Login', Component: Login},
  { path: '/signup', name: 'Signup', Component: Signup},
  { path: '/', name: 'Home', Component: Home },
]


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar/>
        <Switch>
        {routes.map(({ path, Component }) => (
            <Route key={path} path={path}>
              <Component />
            </Route>
          ))}
        </Switch>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
