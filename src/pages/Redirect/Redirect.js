/***********************************************************************
 * File Name: Redirect.js
 * Description: Redirect page.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


 /* Library Imports ****************************************************/
 import React, { useState, useEffect } from "react";
 import { NavLink } from "react-router-dom";

 import { Grow, Grid } from "@material-ui/core";

 import { Button } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { useCommonStyles } from "../../assets/common";
import { useStyles } from "./exports";
/**********************************************************************/


/**********************************************************************
 * Function Name: Redirect
 * Parameters: None
 * Description: Component for the Redirect page.
 * Notes: None
 **********************************************************************/
const Redirect = () => {
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
        <h1 className={common.pageHeader}>Sorry!</h1>
        <br/>
        It doesn't look like you have access to this page. Please login.
        <br/><br/>
        <NavLink to={"/login"} style={{textDecoration: 'none'}}>
            <Button variant="contained">
              Login
            </Button>
          </NavLink>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/>
    </Grid>
    </Grid>
  );

  return (
    <Grow in={true}>
      {<div className={!isMobileView ? common.bodyDiv : common.mobileBodyDiv}>{body}</div>}
    </Grow>
  );
};

export default Redirect;
