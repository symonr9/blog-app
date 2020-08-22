/***********************************************************************
 * File Name: Home.js
 * Description: Home page.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


 /* Library Imports ****************************************************/
 import React, { useState, useEffect } from "react";
 import { Grow, Grid, Paper } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { useCommonStyles } from "../../assets/common";
import { useStyles } from "./exports";
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
          <Paper className={`${classes.homePaper} ${(!isMobileView && classes.paperAnimation || (isMobileView && classes.mobilePaperAnimation))}`} elevation="12">
            <div className={classes.introTitle}><b>Verbum</b></div>
          </Paper>
          <Paper className={`${classes.homePaper} ${(!isMobileView && classes.paperAnimation || (isMobileView && classes.mobilePaperAnimation))}`} elevation="12">
            <div className={classes.introText}>
              <h2>Welcome to my blog!</h2>
              This is a progressive web application built by me, Symon.<br/><br/>
              I made this as a place to put my poetry and prose, as well as quotes that I hear that I think are
              worth remembering.<br/><br/>You are welcome to check out what I've written by clicking on one of the 
              menu buttons above (EX: Poetry).<br/><br/>Thank you for checking out my site!
            </div>
          </Paper>
        <Paper className={`${classes.homePaper} ${(!isMobileView && classes.paperAnimation || (isMobileView && classes.mobilePaperAnimation))}`} elevation="12">
          <div className={classes.introTitle}>Well, what does this app do?</div>
          <div className={classes.introText}>
            Here's a list of completed features: 
            <ul>
              <li>Full CRUD functionality for Poetry, Quotes, and Prose.</li>
              <li>Sort, Filter, and Search Functionality on Browse pages.</li>
              <li>Dynamic pagination on Browse pages.</li>
              <li>Dynamic navbar menu layout (hamburger bars for mobile).</li>
              <li>Word Lookup feature to search rhymes, synonyms, definitions, and more in Create Page (using WordsAPI).</li>
              <li>Normal and Side-By-Side View for Word Lookup.</li>
              <li>NodeJS Express Server integration with MongoDB.</li>
              <li>Document Model and Schema created by leveraging Mongoose.</li>
              <li>User Authentication (Login and Signup) and Tokens/Session Timeout.</li>
              <li>Comments and Reaction Integration on Individual Items Pages (using Disqus).</li>
              <li>Profile Page to list out user created items.</li>
              <li>Admin Dashboard where admins can perform CRUD functionality on any items.</li>
              <li>Mobile support to scale across iOS, Android, and tablets.</li>
              <li>Responsive screen size.</li>
              <li>Standalone PWA on mobile devices.</li>
              <li>Splashscreen Prompt on Mobile Device Browsers prompting to install app on homescreen.</li>
              <li>CI Deployment to Netlify and Heroku.</li>
            </ul>
          </div>
        </Paper>
        <Paper className={`${classes.homePaper} ${(!isMobileView && classes.paperAnimation || (isMobileView && classes.mobilePaperAnimation))} ${classes.endPaper}`} elevation="12">
          <div className={classes.introTitle}>Cool! How did you make it?</div>
          <div className={classes.introText}>
            Here's what I used:
            <br/><br/>
            Frontend: 
            <ul>
              <li>React</li>
              <li>MaterialUI</li>
              <li>React Router</li>
              <li>React Redux</li>
              <li>axios</li>
            </ul>
            Backend: 
            <ul>
              <li>NodeJS</li>
              <li>Express</li>
              <li>MongoDB</li>
              <li>Mongoose</li>
            </ul>
            Check out the source code <a href="https://github.com/symonr9/blog-app" target="_blank">here!</a>
            <br/><br/>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <Grow in={true}>
      {<div className={!isMobileView ? common.bodyDiv : common.mobileBodyDiv}>{body}</div>}
    </Grow>
  );
};

export default Home;
