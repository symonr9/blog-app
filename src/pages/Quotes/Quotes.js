import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Paper, Grow, Grid, CircularProgress } from "@material-ui/core";

import { getData } from "../../services/api";
import { colors, useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import SortFilterBar from '../../components/SortFilterBar';
import ReactTimeAgo from 'react-time-ago';

import { useStyles } from "./exports";

function Quotes() {
  const classes = useStyles();
  const common = useCommonStyles();

  const [quotes, setQuotes] = useState(null);

  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortAuthor, setSortAuthor] = useState(false);
  const [sortDate, setSortDate] = useState(true);
  const [sortDescAuthor, setSortDescAuthor] = useState(true);
  const [sortDescDate, setSortDescDate] = useState(false);

  const [searchChange, setSearchChange] = useState("");

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
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

   //SORT FILTER BAR EFFECTS **************************************
  useEffect(() => {
    if(quotes != null){
      setQuotes(quotes.sort((a,b) => {
        let aItem = a.createdBy.toUpperCase();
        let bItem = b.createdBy.toUpperCase();

        let isDesc = sortDescAuthor;
        setSortDescAuthor(!sortDescAuthor);
        if(isDesc){
          return (aItem > bItem) ? -1 : (aItem < bItem) ? 1 : 0;
        }
        return (aItem < bItem) ? -1 : (aItem > bItem) ? 1 : 0;
      }));
    }
  }, [sortAuthor]);

  useEffect(() => {
    if(quotes != null){
      setQuotes(quotes.sort((a,b) => {
        let aItem = new Date(a.createdAt).getTime();
        let bItem = new Date(b.createdAt).getTime();

        let isDesc = sortDescDate;
        setSortDescDate(!sortDescDate);
        
        if(isDesc){
          return (aItem > bItem) ? -1 : (aItem < bItem) ? 1 : 0;
        }
        return (aItem < bItem) ? -1 : (aItem > bItem) ? 1 : 0;
      }));
    }
  }, [sortDate]);

  useEffect(() => {
    if(quotes != null){
      if(searchChange == ""){
        //setQuotes(originalquotes);
      }
     else{   
        setQuotes(quotes.filter(item => item.text == searchChange));
      }
    }
  }, [searchChange]);

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>Quotes</h1>
        <SortFilterBar
          type={"quotes"} 
          items={quotes}
          isSortMenuOpen={isSortMenuOpen}
          setIsSortMenuOpen={setIsSortMenuOpen}
          sortAuthor={sortAuthor}
          setSortAuthor={setSortAuthor}
          sortDate={sortDate}
          setSortDate={setSortDate}
          searchChange={searchChange}
          setSearchChange={setSearchChange}
        />
        <div className={common.containerDiv}>
          {(quotes &&
            quotes.map((quote, index) => {
              if (quote.isPublic) {
                return (
                  <Paper
                    key={quote._id}
                    elevation={7}
                    className={(!isMobileView && common.itemDiv || (isMobileView && common.mobileItemDiv))}
                  >
                    <NavLink to={`/quotes/${quote.urlId}`}>
                      <span className={classes.text}>"{quote.text}"</span>
                    </NavLink>
                    <span className={classes.author}>
                       -{quote.author}
                    </span>
                    <span className={common.createdAt}>
                      created <ReactTimeAgo date={quote.createdAt} />
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
