/***********************************************************************
 * File Name: Profile.js
 * Description: Profile page. 
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

 /* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom"; 
import { useSelector } from "react-redux";

import MUIRichTextEditor from "mui-rte";

import { Button, Grow, Grid, TextField, Paper, Snackbar, IconButton  } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
/**********************************************************************/

/* Project Imports ****************************************************/
import { postData } from "../../services/api";
import { useStyles, kinds } from "./exports";
import { colors, useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import {
  submitBtn,
  basicTextField,
  selectTextField
} from "../../components/FormElements";
/**********************************************************************/


/**********************************************************************
 * Function Name: Profile
 * Parameters: None
 * Description: Component for the Profile page.
 * Notes: None
 **********************************************************************/
function Profile() {
  /* Authentication Handling ********************************************/
  const sessionUsername = useSelector(state => state.username);

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!sessionUsername;

  const history = useHistory();

  if(!isLoggedIn){
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

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>Profile</h1>
        <iframe src="https://open.spotify.com/embed/playlist/7c53Vxz6Y6sNBNik6at8qU" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> 
      </Grid>
    </Grid>
  );
  return (
    <Grow in={true}>
      {(!isMobileView && <div className={common.bodyDiv}>{body}</div>) ||
        (isMobileView && <div className={common.mobileBodyDiv}>{body}</div>)}
    </Grow>
  );
}

export default Profile;
