import React, { useState, useEffect } from "react";

import { Paper, Grow, Grid } from "@material-ui/core";

import useCommonStyles from "../../assets/common";
import poems from "../../data/poems.json";
import { useStyles } from "./exports";

const Home = () => {
  const classes = useStyles();
  const common = useCommonStyles();

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 768px)").addListener(handler);
  }, []);

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>Symon's Blog</h1>
        Hello and welcome to my blog!
        <h2>Things to explore: </h2>
          <ul>
            <li>Creating new items</li>
            <li>Poetry
              <ul>
                <li>All kinds of poetry, whether structured or prose.</li>
              </ul>
            </li>
            <li>Quotes
              <ul>
                <li>Memorable quotes from people you know or from books, movies, etc.</li>
              </ul>
            </li>
            <li>Prose
              <ul>
                <li>Reflections and notes from sermons and lectures.</li>
              </ul>
            </li>
          </ul>
        <h2>Planned Features: </h2>
          <ul>
            <li>Audio Clips for Spoken Word</li>
            <li>Sermon Notes</li>
            <li>User Authentication (Login and Signup)</li>
            <li>Profile</li>
          </ul>       
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
