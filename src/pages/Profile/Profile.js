import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Paper, Grow, Grid } from "@material-ui/core";

import { colors, useCommonStyles } from "../../assets/common";

import { useStyles } from "./exports";

function Profile() {
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
