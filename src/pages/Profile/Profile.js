/***********************************************************************
 * File Name: Profile.js
 * Description: Profile page. 
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Grow, Grid, CircularProgress } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData } from "../../services/api";
import { useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import ItemCard from '../../components/ItemCard';

import { useStyles } from "./exports";
/**********************************************************************/



/**********************************************************************
 * Function Name: Profile
 * Parameters: None
 * Description: Component for the Profile page.
 * Notes: None
 **********************************************************************/
function Profile() {
  /* Authentication Handling ********************************************/
  const sessionUsername = useSelector(state => state.username);

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!sessionUsername;

  const history = useHistory();

  if(!isLoggedIn){
    history.push("/redirect");
  }
  /**********************************************************************/
  
  const classes = useStyles();
  const common = useCommonStyles();

  const { username } = useParams();

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


  const [poetry, setPoetry] = useState(null);
  const [quotes, setQuotes] = useState(null);
  const [prose, setProse] = useState(null);

  /**********************************************************************
 * Function Name: fetchData
 * Parameters: isSubscribed variable ensures that the component isn't
 * loaded until after the fetch request is completed.
 * Description: Fetches the data of the items being looked at. 
 * Notes: None
 **********************************************************************/
  const fetchData = isSubscribed => {
    getData(getServerURL("poetry/user/" + username), response => {
      if (isSubscribed) {
        setPoetry(response);
      }
    });
    getData(getServerURL("quotes/user/" + username), response => {
      if (isSubscribed) {
        setQuotes(response);
      }
    });
    getData(getServerURL("prose/user/" + username), response => {
      if (isSubscribed) {
        setProse(response);
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


  /*        <iframe src="https://open.spotify.com/embed/playlist/7c53Vxz6Y6sNBNik6at8qU" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>{username}'s Profile</h1>
          <br/>
          <h2>Poetry</h2>
          <div className={classes.profileContainerDiv}>
          {(poetry &&
            poetry.map((poem, index) => {
              if (poem.isPublic) {
                return (
                  <ItemCard 
                    type={"poetry"}
                    key={poem._id}
                    isMobileView={isMobileView}
                    link={`/poetry/${poem.urlId}`}
                    title={poem.title}
                    createdBy={poem.createdBy}
                    body={(poem.body.substring(0,200) + '...')}
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
            </div>

            <h2>Quotes</h2>
            <div className={classes.profileContainerDiv}>
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

            <h2>Prose</h2>
            <div className={classes.profileContainerDiv}>
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
                  body={(item.body.substring(0,200) + '...')}
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
      {(!isMobileView && <div className={common.bodyDiv}>{body}</div>) ||
        (isMobileView && <div className={common.mobileBodyDiv}>{body}</div>)}
    </Grow>
  );
}

export default Profile;
