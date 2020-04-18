/***********************************************************************
 * File Name: Home.js
 * Description: Home page.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


 /* Library Imports ****************************************************/
 import React, { useState, useEffect } from "react";
 import { Paper, Grow, Grid } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { useCommonStyles } from "../../assets/common";
import { useStyles } from "./exports";

import icon from "../../assets/logo.svg";
/**********************************************************************/


/**********************************************************************
 * Function Name: Home
 * Parameters: None
 * Description: Component for the Home page.
 * Notes: None
 **********************************************************************/
const Home = () => {
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
        <center>
          <object id="my-svg" type="image/svg+xml" className={!isMobileView ? classes.logo : classes.mobileLogo} data={icon}></object>
        </center>
        <span className={classes.introTitle}>The things we stay alive for</span>
        <br/>
        <span className={classes.introQuote}>We don't read and write poetry because it's cute. 
        We read and write poetry because we are members of the human race. 
        And the human race is filled with passion. 
        And medicine, law, business, engineering, these are noble pursuits and necessary to sustain life. 
        But poetry, beauty, romance, love... these are what we stay alive for. -Mr.Keating, Dead Poets Society</span>
        <br/><br/><br/>
      </Grid>
    </Grid>
  );

  return (
    <Grow in={true}>
      {(!isMobileView && <div className={common.bodyDiv}>{body}</div>) ||
        (isMobileView && <div className={common.mobileBodyDiv}>{body}</div>)}
    </Grow>
  );
};

export default Home;
