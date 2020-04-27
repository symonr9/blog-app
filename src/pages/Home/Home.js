/***********************************************************************
 * File Name: Home.js
 * Description: Home page.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


 /* Library Imports ****************************************************/
 import React, { useState, useEffect } from "react";
 import { Grow, Grid } from "@material-ui/core";
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
        <div className={classes.homeSpacingDiv}></div>
        <div className={classes.introTitle}>Had we but Honey enough and time...</div>
        <div className={classes.introText}>Welcome to my blog! I'm Symon. I like to write 
        and write and write. This is a web application I wrote for fun from March to April 2020.
        </div>
        <div className={classes.smallSpacingDiv}></div>
        <div className={classes.introTitle}>Well, what does this app do?</div>
        <br/><br/>
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
        <div className={classes.smallSpacingDiv}></div>
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
