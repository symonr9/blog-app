import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

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

const backgroundDiv = {
  background:
    "linear-gradient(to bottom, #3359ae 4%, #34b09b 20%, #ebe5d9 50%)"
};

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar />
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path}>
              <div style={backgroundDiv}>
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
