import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Paper, Grow, Grid, CircularProgress } from "@material-ui/core";
import { getData } from "../../services/api";
import useCommonStyles from "../../assets/common";
import { getServerURL } from "../../config/config";

import { useStyles } from "./exports";

import Comments from "../../components/Comments";

function Quotes() {
  const classes = useStyles();
  const common = useCommonStyles();

  const [quotes, setQuotes] = useState(null);

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 768px)").addListener(handler);
  }, []);

  const fetchData = isSubscribed => {
    console.log(getServerURL("quotes"));
    getData(getServerURL("quotes"), response => {
      if (isSubscribed) {
        setQuotes(response);
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
        <h1>Quotes</h1>
        <div className={classes.quoteContainerDiv}>
          {(quotes &&
            quotes.map((quote, index) => {
              if (quote.isPublic) {
                return (
                  <Paper
                    key={quote._id}
                    elevation={7}
                    className={classes.quoteDiv}
                  >
                    <span className={classes.text}>"{quote.text}"</span>
                    <span className={classes.author}>
                       -{quote.author}
                    </span>
                    <span className={classes.createdAt}>
                      Created at: {quote.createdAt}
                    </span>
                  </Paper>
                );
              }
            })) ||
            (!quotes && (
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

export default Quotes;
