import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Paper, Grow, Grid, CircularProgress } from "@material-ui/core";
import { getData } from "../../services/api";
import useCommonStyles from "../../assets/common";

import { useStyles } from "./exports";

function Poetry() {
  const classes = useStyles();
  const common = useCommonStyles();

  const [poems, setPoems] = useState(null);

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 768px)").addListener(handler);
  }, []);

  const fetchData = isSubscribed => {
    getData("http://localhost:2020/poems/", response => {
      if (isSubscribed) {
        setPoems(response);
      }
    });
  };

  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && fetchData(isSubscribed);
    return () => (isSubscribed = false);
  }, []);

  console.log(poems);

  const body = (
    <Grid container>
      <Grid item xs={12}>
        {!isMobileView && <div className={common.spacingTop}></div>}
        <h1>Poetry</h1>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.poemContainerDiv}>
        {poems && (poems.map((poem, index) => {
          if(poem.isPublic){
            return (
                <Paper key={poem._id} elevation={7} className={classes.poemDiv} >
                  <span className={classes.title}>{poem.title}</span>
                  <span className={classes.createdBy}>By {poem.createdBy}</span>
                  <span className={classes.body}>{poem.body}</span>
                  <span className={classes.createdAt}>Created at: {poem.createdAt}</span>
                </Paper>
            );
          }
        }))
        ||
        (!poems && (<div><CircularProgress /></div>))
        }
        </div>
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

export default Poetry;
