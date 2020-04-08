import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Paper, Grow, Grid, CircularProgress } from "@material-ui/core";
import { getData } from "../../services/api";
import useCommonStyles from "../../assets/common";
import { getServerURL } from "../../config/config";

import ReactTimeAgo from 'react-time-ago';

import { useStyles } from "./exports";

function Prose() {
  const classes = useStyles();
  const common = useCommonStyles();

  const [prose, setProse] = useState(null);

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
  }, []);

  const fetchData = isSubscribed => {
    console.log(getServerURL("prose"));
    getData(getServerURL("prose"), response => {
      if (isSubscribed) {
        setProse(response);
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
        <h1>Prose</h1>
        <div className={common.containerDiv}>
          {(prose &&
            prose.map((p, index) => {
              if (p.isPublic) {
                return (
                  <Paper
                    key={p._id}
                    elevation={7}
                    className={(!isMobileView && common.itemDiv || (isMobileView && common.mobileItemDiv))}
                  >
                    <NavLink to={`/prose/${p.urlId}`}>
                      <span className={common.title}>{p.title}</span>
                    </NavLink>
                    <span className={common.body}>
                      {p.body.substring(0,200)}...
                    </span>
                    <span className={common.createdAt}>
                      created <ReactTimeAgo date={p.createdAt} />
                    </span>
                  </Paper>
                );
              }
            })) ||
            (!prose && (
              <div>
                <CircularProgress />
              </div>
            ))}
        </div>
      </Grid>
    </Grid>
  );

  return (
    <Grow in={true}>
      {<div className={(!isMobileView && common.bodyDiv || (isMobileView && common.mobileBodyDiv))}>{body}</div>}
    </Grow>
  );
}

export default Prose;
