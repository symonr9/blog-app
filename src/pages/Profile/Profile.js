import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Paper, Grow, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import useCommonStyles from "../../assets/common";

const useStyles = makeStyles({});

function Profile() {
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
      {!isMobileView && (<div className={common.spacingTop}></div>)}
        <h1>Profile</h1>
      </Grid>
      <Grid item xs={4}>
        Profile
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={6}></Grid>
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
