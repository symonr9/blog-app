import React, { useState, useEffect } from "react";

import { Paper, Grow, Grid } from "@material-ui/core";

import { colors, useCommonStyles } from "../../assets/common";
import poems from "../../data/poems.json";
import { useStyles } from "./exports";

const Home = () => {
  const classes = useStyles();
  const common = useCommonStyles();

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
  }, []);

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>Symon's Blog</h1>
        <br/>
        Hello and welcome to my blog!
        <br/><br/>

        This is a progressive web application (PWA) that I wrote to host some of the writings that I've done.
        This includes poems and prose, in addition to quotes that I've heard from others that I like to 
        re-visit. 
        <br/><br/>

        This PWA was created using ReactJS on the front-end and Node on the back-end. Because this is a PWA,
        this application can be visible on browser or mobile for offline use. This application can be added
        to the home screen on both iOS and Android.
        <br/><br/>

        <br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/>
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
