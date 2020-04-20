/***********************************************************************
 * File Name: Poetry.js
 * Description: Poetry page. Component to browse poetry. Utilizes 
 * abstracted ItemCard and SortFilterBar components shared with the 
 * Prose and Quotes components.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";

import { Grow, Grid, CircularProgress } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData } from "../../services/api";
import { colors, useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import ItemCard from '../../components/ItemCard';
import SortFilterBar from '../../components/SortFilterBar';
import CoolPagination from '../../components/CoolPagination';

import { useStyles } from "./exports";
/**********************************************************************/


/**********************************************************************
 * Function Name: Poetry
 * Parameters: None
 * Description: Component for the Poetry section.
 * Notes: None
 **********************************************************************/
function Poetry() {
  const classes = useStyles();
  const common = useCommonStyles();

  //Data type for these hooks are arrays.
  const [poetry, setPoetry] = useState(null);

  /* Mobile View Handler ************************************************/
  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );

  //Adds a listener to re-render the component when the window width changes.
  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
  }, []);
  /**********************************************************************/
  


/**********************************************************************
 * Function Name: fetchData
 * Parameters: isSubscribed variable ensures that the component isn't
 * loaded until after the fetch request is completed.
 * Description: Fetches the data of the items being looked at. 
 * Notes: None
 **********************************************************************/
  const fetchData = isSubscribed => {
    getData(getServerURL("poetry"), response => {
      if (isSubscribed) {
        const items = response.sort(() => {
          return 0.5 - Math.random();
        });
        setPoetry(items);
        setCurrentPage(items.slice(0, numOfItemsPerPage));
        setNumOfPages(Math.ceil(items.length / numOfItemsPerPage));
      }
    });
  };

  //Run fetchData on the first render. When the second parameter is an 
  //empty array, the useEffect function will only be executed on page load.
  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && fetchData(isSubscribed);
    return () => (isSubscribed = false);
  }, []);


  //SORT FILTER BAR EFFECTS **************************************
  //These hooks are passed into the SortFilterBar component and used
  //there. They have to be defined in the parent component in order to 
  //perform operations on the parent component data hooks to render 
  //other parts of the page.
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortTitle, setSortTitle] = useState(false);
  const [sortAuthor, setSortAuthor] = useState(false);
  const [sortDate, setSortDate] = useState(true);
  const [sortRandom, setSortRandom] = useState(false);

  const [sortDescTitle, setSortDescTitle] = useState(true);
  const [sortDescAuthor, setSortDescAuthor] = useState(true);
  const [sortDescDate, setSortDescDate] = useState(true);

  const [isFullText, setIsFullText] = useState(false);

  const [searchChange, setSearchChange] = useState("");

  //Runs whenever the second parameter hook is changed.
  //If the setter is passed into a child component and called, 
  //the useEffect() will still run.
  useEffect(() => {
    if(poetry != null){
      setPoetry(poetry.sort((a,b) => {
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
    if(poetry != null){
      setPoetry(poetry.sort((a,b) => {
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
    if(poetry != null){
      setPoetry(poetry.sort((a,b) => {
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
    if(poetry != null){
      setPoetry(poetry.sort(() => {
        return 0.5 - Math.random();
      }));
    }
  }, [sortRandom]);

  useEffect(() => {
    if(poetry != null){
      if(searchChange !== ""){  
        setPoetry(poetry.filter(item => item.title == searchChange));
      }
    }
  }, [searchChange]);
  


  /* PAGINATION *********************************************************/
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [numOfPages, setNumOfPages] = useState(1);
  const [numOfItemsPerPage, setNumOfItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(null);

  //Executes whenever page changes.
  useEffect(() => {
    if(currentPage !== null){
      setCurrentPage(poetry.slice(startIndex, startIndex + numOfItemsPerPage));
    }
  }, [page, sortTitle, sortAuthor, sortDate, sortRandom, searchChange]);
  /**********************************************************************/



  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>Poetry</h1>
        <SortFilterBar
          type={"poetry"} 
          items={poetry}
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
          numOfItemsPerPage={numOfItemsPerPage}
          setNumOfItemsPerPage={setNumOfItemsPerPage}
          isMobileView={isMobileView}
        />

        <CoolPagination 
          type={"poetry"}
          location={"top"}
          items={poetry}
          page={page}
          setPage={setPage}
          setStartIndex={setStartIndex}
          numOfPages={numOfPages}
          numOfItemsPerPage={numOfItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isMobileView={isMobileView}
        />
        <div className={common.containerDiv}>
          {(currentPage &&
            currentPage.map((poem, index) => {
              if (poem.isPublic) {
                return (
                  <ItemCard 
                    type={"poetry"}
                    key={poem._id}
                    isMobileView={isMobileView}
                    link={`/poetry/${poem.urlId}`}
                    title={poem.title}
                    createdBy={poem.createdBy}
                    body={(!isFullText && poem.body.substring(0,200) + '...')
                    || (isFullText && poem.body)}
                    createdAt={poem.createdAt}
                  />
                );
              }
            })) ||
            (!poetry && (
              <div>
                <CircularProgress />
              </div>
            ))}
            <CoolPagination 
              type={"poetry"}
              location={"bottom"}
              items={poetry}
              page={page}
              setPage={setPage}
              setStartIndex={setStartIndex}
              numOfPages={numOfPages}
              numOfItemsPerPage={numOfItemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isMobileView={isMobileView}
            />
        </div>
      </Grid>
    </Grid>
  );
  
  return (
    <Grow in={true}>
      {<div className={!isMobileView ? common.bodyDiv : common.mobileBodyDiv}>{body}</div>}
    </Grow>
  );
}

export default Poetry;
