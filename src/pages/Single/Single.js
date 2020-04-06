
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { Paper, Grow, Grid, CircularProgress } from "@material-ui/core";
import { getData } from "../../services/api";
import useCommonStyles from "../../assets/common";
import { getServerURL } from "../../config/config";

import { useStyles } from "./exports";

import Comments from "../../components/Comments";


function Single() {  
  const { urlId } = useParams();

  const classes = useStyles();
  const common = useCommonStyles();

  const [data, setData] = useState(null);

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 768px)").addListener(handler);
  }, []);

  //prose, quotes, poems
  const fetchData = isSubscribed => {
    console.log(urlId);
    getData(getServerURL("prose/adamant-giant-yak"), response => {
      if (isSubscribed) {
        setData(response);
      }
    });
  };

  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && fetchData(isSubscribed);
    return () => (isSubscribed = false);
  }, []);

  const bodyContent = (
    <div>
      urlId: {urlId}
    </div>
  );

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>Prose</h1>
        <div className={classes.proseContainerDiv}>
          {(data && bodyContent) ||
            (!data && (
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

export default Single;
