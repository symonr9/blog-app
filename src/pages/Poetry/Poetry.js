import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Paper, Grow, Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getData } from "../../services/api";

import useCommonStyles from "../../assets/common";


const useStyles = makeStyles({
  poemContainerDiv: {
    display: 'flex',
    flexFlow: "row wrap",
    marginBottom: '5em'
  },
  poemDiv: {
    flex: '30%',
    padding: '10px',
    backgroundColor: 'transparent',
    width: '100px',
    marginRight: '1em',
    marginBottom: '1em',
  },
  title: {
    fontSize: '1.5em',
    display: 'block'
  },
  createdBy: {
    fontSize: '1em',
    display: 'block'
  },
  body: {
    fontSize: '1.25em',
    display: 'block',
    marginTop: '0.75em',
    marginBottom: '0.75em'
  },
  notes: {
    fontSize: '0.75em',
    display: 'block'
  },
  type: {
    fontSize: '0.75em',
    display: 'block'
  },
  createdAt: {
    fontSize: '0.75em',
    display: 'block',
    position: 'relative',
    bottom: '0'
  }
});

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
