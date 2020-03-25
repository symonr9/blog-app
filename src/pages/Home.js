import React, { useState, useEffect } from "react";

import { Paper, Grow, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import useCommonStyles from "../assets/common";

import poems from "../data/poems.json";

const useStyles = makeStyles({});

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
        <h1>Symon's Blog</h1>
      </Grid>
      <Grid item xs={12}>
        {poems[1]["title"]}
        <br />
        <br />
        {poems[1]["body"]}
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
