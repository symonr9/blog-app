/***********************************************************************
 * File Name: Login.js
 * Description: Login page. The ability to signup here.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

 /* Library Imports ****************************************************/
 import React, { useEffect, useState } from "react";
 import { useForm } from "react-hook-form";
 
 import { useDispatch, useSelector } from "react-redux";
 import { useHistory } from "react-router-dom";
 
 import { Grow, Grid } from "@material-ui/core";
 /**********************************************************************/
 
 /* Project Imports ****************************************************/
 import { postData } from "../../services/api";
 import { useStyles } from "./exports";
 import { useCommonStyles } from "../../assets/common";
 import { getServerURL } from "../../config/config";
 
 import { loginUser } from "../../services/redux/actions";
 
 import {
   submitBtn,
   basicTextField,
   passwordTextField
 } from "../../components/FormElements";
 /**********************************************************************/
 

 /**********************************************************************
 * Function Name: Signup
 * Parameters: None
 * Description: Component for the Signup page.
 * Notes: None
 **********************************************************************/
const Signup = () => {
  /* Authentication Handling ********************************************/
  const sessionUsername = useSelector(state => state.username);

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!sessionUsername;

  const history = useHistory();
  const dispatch = useDispatch();
  
  if(isLoggedIn){
    history.push("/redirect");
  }
  /**********************************************************************/

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

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

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
      "email": email,
      "username": username,
      "password": password
    };
    
      postData(getServerURL("users/signup"), data,
        response => {
          const { token, username } = response;

          //Save login credentials into redux store for cross-application use.
          dispatch(loginUser(token, username));

          //Redirect to home page.
          history.push("/");
        },
      );

  };
  /******************************************************* */

  const body = (
    <Grid container>
      <Grid item xs={12}>
      {!isMobileView && (<div className={common.spacingTop}></div>)}
        <br/>
        <h1 className={common.pageHeader}>Signup</h1>
      </Grid>
      <Grid item xs={12}>
        <div className={`${common.formAnimation} ${classes.spacingBottom}`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {basicTextField("email", "Email", handleEmailChange)}
            {basicTextField("username", "Username", handleUsernameChange)}
            {passwordTextField("password", "Password", handlePasswordChange)}
            {submitBtn("Sign Up")}
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

export default Signup;
