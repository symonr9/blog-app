import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Paper, Grow, Grid, CircularProgress } from "@material-ui/core";

import { getData } from "../../services/api";
import { colors, useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import ItemCard from '../../components/ItemCard';
import SortFilterBar from '../../components/SortFilterBar';

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

  //SORT FILTER BAR EFFECTS **************************************
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortTitle, setSortTitle] = useState(false);
  const [sortAuthor, setSortAuthor] = useState(false);
  const [sortDate, setSortDate] = useState(true);
  const [sortRandom, setSortRandom] = useState(false);

  const [sortDescTitle, setSortDescTitle] = useState(true);
  const [sortDescAuthor, setSortDescAuthor] = useState(true);
  const [sortDescDate, setSortDescDate] = useState(false);

  const [isFullText, setIsFullText] = useState(false);

  const [searchChange, setSearchChange] = useState("");

  useEffect(() => {
    if(prose != null){
      setProse(prose.sort((a,b) => {
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

  useEffect(() => {
    if(prose != null){
      setProse(prose.sort((a,b) => {
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
    if(prose != null){
      setProse(prose.sort((a,b) => {
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
    if(prose != null){
      setProse(prose.sort(() => {
        return 0.5 - Math.random();
      }));
    }
  }, [sortRandom]);

  useEffect(() => {
    if(prose != null){
      if(searchChange == ""){
        //setProse(originalProse);
      }
     else{   
        setProse(prose.filter(item => item.title == searchChange));
      }
    }
  }, [searchChange]);

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>Prose</h1>
        <SortFilterBar
          type={"prose"} 
          items={prose}
          isSortMenuOpen={isSortMenuOpen}
          setIsSortMenuOpen={setIsSortMenuOpen}
          sortTitle={sortTitle}
          setSortTitle={setSortTitle}
          sortAuthor={sortAuthor}
          setSortAuthor={setSortAuthor}
          sortDate={sortDate}
          setSortDate={setSortDate}
          sortRandom={sortRandom}
          setSortRandom={setSortRandom}
          isFullText={isFullText}
          setIsFullText={setIsFullText}
          searchChange={searchChange}
          setSearchChange={setSearchChange}
        />
        <div className={common.containerDiv}>
          {(prose &&
            prose.map((item, index) => {
              if (item.isPublic) {
                return (
                  <ItemCard 
                  type={"prose"}
                  key={item._id}
                  isMobileView={isMobileView}
                  link={`/prose/${item.urlId}`}
                  title={item.title}
                  createdBy={item.createdBy}
                  body={(!isFullText && item.body.substring(0,200) + '...')
                  || (isFullText && item.body)}
                  createdAt={item.createdAt}
                  />
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
