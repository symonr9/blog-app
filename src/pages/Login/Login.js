/***********************************************************************
 * File Name: Login.js
 * Description: Login page. The ability to login here.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

 /* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom";

import { Grow, Grid } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { postData } from "../../services/api";
import { useStyles } from "./exports";
import { useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import { useDispatch } from "react-redux";
import { loginUser } from "../../services/redux/actions";

import {
  submitBtn,
  basicTextField,
  passwordTextField
} from "../../components/FormElements";
/**********************************************************************/


/**********************************************************************
 * Function Name: Login
 * Parameters: None
 * Description: Component for the Login page.
 * Notes: None
 **********************************************************************/
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();
  const common = useCommonStyles();

  /* Mobile View Handler ************************************************/
  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );

  //Adds a listener to re-render the component when the window width changes.
  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
  }, []);
  /**********************************************************************/

  /* Hooks and Handlers For Submit Form ****************** */
  const { handleSubmit } = useForm();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };


/**********************************************************************
 * Function Name: onSubmit
 * Parameters: None (uses hooks)
 * Description: Creates a post request with the forms as dynamically 
 * defined based on the type of data being submitted.
 * Notes: None
 **********************************************************************/
  const onSubmit = () => {
    let data = {
      "username": username,
      "password": password
    };

    postData(getServerURL("users/login"), data,
    response => {
      const { token, username } = response;

      //Save login credentials into redux store for cross-application use.
      dispatch(loginUser(token, username));

      //Redirect to home page.
      history.push("/");
    }
    );

  };
  /******************************************************* */


  const body = (
    <Grid container>
      <Grid item xs={12}>
      {!isMobileView && (<div className={common.spacingTop}></div>)}
      <br/><br/>
        <h1 className={common.pageHeader}>Login</h1>
      </Grid>
      <Grid item xs={12}>
        <div className={`${common.formAnimation} ${classes.spacingBottom}`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {basicTextField("username", "Username", handleUsernameChange)}
            {passwordTextField("password", "Password", handlePasswordChange)}
            {submitBtn("Login")}
          </form>
        </div>
      </Grid>
    </Grid>
  );

  return (
    <Grow in={true}>
      {<div className={!isMobileView ? common.bodyDiv : common.mobileBodyDiv}>{body}</div>}
    </Grow>
  );
};

export default Login;
