/***********************************************************************
 * File Name: Quotes.js
 * Description: Quotes page. Component to browse quotes. Utilizes 
 * abstracted ItemCard and SortFilterBar components shared with the 
 * Prose and Poetry components.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";

import { Grow, Grid, CircularProgress } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData } from "../../services/api";
import { useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import ItemCard from '../../components/ItemCard';
import SortFilterBar from '../../components/SortFilterBar';

import { useStyles } from "./exports";
/**********************************************************************/


/**********************************************************************
 * Function Name: Quotes
 * Parameters: None
 * Description: Component for the Quotes section.
 * Notes: None
 **********************************************************************/
function Quotes() {
  const classes = useStyles();
  const common = useCommonStyles();

  //Data type for these hooks are arrays.
  const [quotes, setQuotes] = useState(null);

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
    console.log(getServerURL("quotes"));
    getData(getServerURL("quotes"), response => {
      if (isSubscribed) {
        setQuotes(response);
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
  const [sortAuthor, setSortAuthor] = useState(false);
  const [sortDate, setSortDate] = useState(true);
  const [sortRandom, setSortRandom] = useState(false);
  const [sortDescAuthor, setSortDescAuthor] = useState(true);
  const [sortDescDate, setSortDescDate] = useState(true);

  const [searchChange, setSearchChange] = useState("");

  //Runs whenever the second parameter hook is changed.
  //If the setter is passed into a child component and called, 
  //the useEffect() will still run.
  useEffect(() => {
    if (quotes != null) {
      setQuotes(
        quotes.sort((a, b) => {
          let aItem = a.author.toUpperCase();
          let bItem = b.author.toUpperCase();

          let isDesc = sortDescAuthor;
          setSortDescAuthor(!sortDescAuthor);
          if (isDesc) {
            return aItem > bItem ? -1 : aItem < bItem ? 1 : 0;
          }
          return aItem < bItem ? -1 : aItem > bItem ? 1 : 0;
        })
      );
    }
  }, [sortAuthor]);

  useEffect(() => {
    if (quotes != null) {
      setQuotes(
        quotes.sort((a, b) => {
          let aItem = new Date(a.createdAt).getTime();
          let bItem = new Date(b.createdAt).getTime();

          let isDesc = sortDescDate;
          setSortDescDate(!sortDescDate);

          if (isDesc) {
            return aItem > bItem ? -1 : aItem < bItem ? 1 : 0;
          }
          return aItem < bItem ? -1 : aItem > bItem ? 1 : 0;
        })
      );
    }
  }, [sortDate]);

  useEffect(() => {
    if (quotes != null) {
      setQuotes(
        quotes.sort(() => {
          return 0.5 - Math.random();
        })
      );
    }
  }, [sortRandom]);

  useEffect(() => {
    if (quotes != null) {
      if (searchChange == "") {
        //setQuotes(originalquotes);
      } else {
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
          sortRandom={sortRandom}
          setSortRandom={setSortRandom}
          searchChange={searchChange}
          setSearchChange={setSearchChange}
        />
        <div className={common.containerDiv}>
          {(quotes &&
            quotes.map((quote, index) => {
              if (quote.isPublic) {
                return (
                  <ItemCard 
                  type={"quotes"}
                  key={quote._id}
                  isMobileView={isMobileView}
                  link={`/quotes/${quote.urlId}`}
                  text={quote.text}
                  author={quote.author}
                  createdAt={quote.createdAt}
                />
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
      {
        <div
          className={
            (!isMobileView && common.bodyDiv) ||
            (isMobileView && common.mobileBodyDiv)
          }
        >
          {body}
        </div>
      }
    </Grow>
  );
}

export default Quotes;
