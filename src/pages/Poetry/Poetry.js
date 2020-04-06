import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Paper, Grow, Grid, CircularProgress } from "@material-ui/core";
import { getData } from "../../services/api";
import useCommonStyles from "../../assets/common";
import { getServerURL } from "../../config/config";

import Comments from "../../components/Comments";

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
    console.log(getServerURL("poems"));
    getData(getServerURL("poems"), response => {
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

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>Poetry</h1>
        <div className={classes.poemContainerDiv}>
          {(poems &&
            poems.map((poem, index) => {
              if (poem.isPublic) {
                return (
                  <Paper
                    key={poem._id}
                    elevation={7}
                    className={classes.poemDiv}
                  >
                    <NavLink to={`/poetry/${poem.urlId}`}>
                      <span className={classes.title}>{poem.title}</span>
                    </NavLink>
                    <span className={classes.createdBy}>
                      By {poem.createdBy}
                    </span>
                    <span className={classes.body}>{poem.body.substring(0,200)}...</span>
                    <span className={classes.createdAt}>
                      Created at: {poem.createdAt}
                    </span>
                  </Paper>
                );
              }
            })) ||
            (!poems && (
              <div>
                <CircularProgress />
              </div>
            ))}
        </div>
        <Comments />
      </Grid>
    </Grid>
  );
  
  return (
    <Grow in={true}>
      {<div className={(!isMobileView && common.bodyDiv || (isMobileView && common.mobileBodyDiv))}>{body}</div>}
    </Grow>
  );
}

export default Poetry;
