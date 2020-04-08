import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Paper, Grow, Grid, CircularProgress } from "@material-ui/core";

import SortByAlphaRoundedIcon from '@material-ui/icons/SortByAlphaRounded';
import SortRoundedIcon from '@material-ui/icons/SortRounded';

import { getData } from "../../services/api";
import useCommonStyles from "../../assets/common";
import { getServerURL } from "../../config/config";

import ReactTimeAgo from 'react-time-ago';

import { useStyles } from "./exports";

function Poetry() {
  const classes = useStyles();
  const common = useCommonStyles();

  const [poems, setPoems] = useState(null);
  const [sortAlpha, setSortAlpha] = useState(true);
  const [sortDescTitle, setSortDescTitle] = useState(true);

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
  }, []);

  const fetchData = isSubscribed => {
    console.log(getServerURL("poems"));
    getData(getServerURL("poems"), response => {
      if (isSubscribed) {
        setPoems(response.sort((a,b) => {
          let aTitle = a.title.toUpperCase();
          let bTitle = b.title.toUpperCase();
          return (aTitle < bTitle) ? -1 : (aTitle > bTitle) ? 1 : 0;
        }));
      }
    });
  };

  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && fetchData(isSubscribed);
    return () => (isSubscribed = false);
  }, []);


  //Sort Alphabetically
  useEffect(() => {
    if(poems != null){
      setPoems(poems.sort((a,b) => {
        let aTitle = a.title.toUpperCase();
        let bTitle = b.title.toUpperCase();
        if(sortDescTitle){
          setSortDescTitle(!sortDescTitle);
          //Sort ascending alphatically
          return (aTitle > bTitle) ? -1 : (aTitle < bTitle) ? 1 : 0;
        }
        setSortDescTitle(!sortDescTitle);
        return (aTitle < bTitle) ? -1 : (aTitle > bTitle) ? 1 : 0;
      }));
    }
  }, [sortAlpha]);


  const handleSortAlpha = () => {
    setSortAlpha(!sortAlpha);
  };

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>Poetry</h1>
        <SortByAlphaRoundedIcon onClick={handleSortAlpha}/>
        <SortRoundedIcon />
          <br/><br/>
        <div className={classes.poemContainerDiv}>
          {(poems &&
            poems.map((poem, index) => {
              if (poem.isPublic) {
                return (
                  <Paper
                    key={poem._id}
                    elevation={7}
                    className={(!isMobileView && classes.poemDiv || (isMobileView && classes.mobilePoemDiv))}
                  >
                    <NavLink to={`/poetry/${poem.urlId}`}>
                      <span className={classes.title}>{poem.title}</span>
                    </NavLink>
                    <span className={classes.createdBy}>
                      By {poem.createdBy}
                    </span>
                    <span className={classes.body}>{poem.body.substring(0,200)}...</span>
                    <span className={classes.createdAt}>
                      created <ReactTimeAgo date={poem.createdAt} />
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
