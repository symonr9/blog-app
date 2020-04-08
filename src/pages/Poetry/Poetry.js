import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Chip, Paper, Grow, Grid, CircularProgress } from "@material-ui/core";

import SortByAlphaRoundedIcon from '@material-ui/icons/SortByAlphaRounded';
import SortRoundedIcon from '@material-ui/icons/SortRounded';
import FaceIcon from '@material-ui/icons/Face';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';

import { getData } from "../../services/api";
import useCommonStyles from "../../assets/common";
import { getServerURL } from "../../config/config";

import ReactTimeAgo from 'react-time-ago';

import { useStyles } from "./exports";

function Poetry() {
  const classes = useStyles();
  const common = useCommonStyles();

  const [poems, setPoems] = useState(null);
  
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortTitle, setSortTitle] = useState(false);
  const [sortAuthor, setSortAuthor] = useState(false);
  const [sortDate, setSortDate] = useState(true);
  const [sortDescTitle, setSortDescTitle] = useState(true);
  const [sortDescAuthor, setSortDescAuthor] = useState(true);
  const [sortDescDate, setSortDescDate] = useState(false);

  

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


  const handleSortMenuOpen = () => {
    setIsSortMenuOpen(!isSortMenuOpen);
  };



  
  const handleSortTitle = () => {
    setSortTitle(!sortTitle);
  };

  useEffect(() => {
    if(poems != null){
      setPoems(poems.sort((a,b) => {
        let aItem = a.title.toUpperCase();
        let bItem = b.title.toUpperCase();

        let isDesc = sortDescTitle;
        setSortDescTitle(!sortDescTitle);
        if(isDesc){
          return (aItem > bItem) ? -1 : (aItem < bItem) ? 1 : 0;
        }
        return (aItem < bItem) ? -1 : (aItem > bItem) ? 1 : 0;
      }));
    }
  }, [sortTitle]);



  const handleSortAuthor = () => {
    setSortAuthor(!sortAuthor);
  }

  useEffect(() => {
    if(poems != null){
      setPoems(poems.sort((a,b) => {
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


  const handleSortDate = () => {
    setSortDate(!sortDate);
  };

  useEffect(() => {
    if(poems != null){
      setPoems(poems.sort((a,b) => {
        let aItem = new Date(a.createdAt).getTime();
        let bItem = new Date(b.createdAt).getTime();

        let isDesc = sortDescDate;
        setSortDescDate(!sortDescDate);
        if(isDesc){
          return (aItem > bItem) ? -1 : (aItem < bItem) ? 1 : 0;
        }
        return (aItem < bItem) ? -1 : (aItem > bItem) ? 1 : 0;
      }));
      console.log(poems);
    }
  }, [sortDate]);


  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>Poetry</h1>
        <SortByAlphaRoundedIcon className={common.sortWidget} onClick={handleSortTitle}/>
        <SortRoundedIcon className={common.sortWidget} onClick={handleSortMenuOpen}/>
        {(isSortMenuOpen && (
          <span>
            <Chip variant="outlined" icon={<FaceIcon />} label="By Author" onClick={handleSortAuthor}/>
            <Chip variant="outlined" icon={<ScheduleRoundedIcon />} label="By Date" onClick={handleSortDate}/>
          </span>
          )
        )}
          <br/><br/>
        <div className={common.containerDiv}>
          {(poems &&
            poems.map((poem, index) => {
              if (poem.isPublic) {
                return (
                  <Paper
                    key={poem._id}
                    elevation={7}
                    className={(!isMobileView && common.itemDiv || (isMobileView && common.mobileItemDiv))}
                  >
                    <NavLink to={`/poetry/${poem.urlId}`}>
                      <span className={common.title}>{poem.title}</span>
                    </NavLink>
                    <span className={common.createdBy}>
                      By {poem.createdBy}
                    </span>
                    <span className={common.body}>{poem.body.substring(0,200)}...</span>
                    <span className={common.createdAt}>
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
