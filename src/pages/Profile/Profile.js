/***********************************************************************
 * File Name: Profile.js
 * Description: Profile page. 
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Grow, Grid, CircularProgress, Paper } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData } from "../../services/api";
import { useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import ItemCard from '../../components/ItemCard';

import { useStyles } from "./exports";

import {
  textFieldStyle,
  submitBtn,
  basicTextField,
  selectTextField
} from "../../components/FormElements";
/**********************************************************************/



const colorOptions = [
  {
    value: "blue",
    label: "Blue"
  },
  {
    value: "red",
    label: "Red"
  },
  {
    value: "green",
    label: "Green"
  },
  {
    value: "yellow",
    label: "Yellow"
  },
  {
    value: "purple",
    label: "Purple"
  },
  {
    value: "black",
    label: "Black"
  }
];

const fontOptions = [
  {
    value: "Cabin",
    label: "Cabin"
  },
  {
    value: "Julius Sans One",
    label: "Julius Sans One"
  },
  {
    value: "Cabin Condensed",
    label: "Cabin Condensed"
  },
  {
    value: "Times New Roman",
    label: "Times New Roman"
  },
  {
    value: "Arial",
    label: "Arial"
  }
];


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
  /**********************************************************************/
  
  const classes = useStyles();
  const common = useCommonStyles();

  const { username } = useParams();

  const isOwnProfile = sessionUsername === username;

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
  const [user, setUser] = useState(null);

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
    getData(getServerURL("users/" + username), response => {
      if (isSubscribed) {
        setUser(response);
        setColorPrefs0(response[0].colorPrefs[0]);
        setColorPrefs1(response[0].colorPrefs[1]);
        setColorPrefs2(response[0].colorPrefs[2]);
        setColorPrefs3(response[0].colorPrefs[3]);
        setColorPrefs4(response[0].colorPrefs[4]);

        setFontPrefs0(response[0].fontPrefs[0]);
        setFontPrefs1(response[0].fontPrefs[1]);
        setFontPrefs2(response[0].fontPrefs[2]);
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


  const [colorPrefs0, setColorPrefs0] = useState(user ? user[0].colorPrefs[0] : null);
  const [colorPrefs1, setColorPrefs1] = useState(user ? user[0].colorPrefs[1] : null);
  const [colorPrefs2, setColorPrefs2] = useState(user ? user[0].colorPrefs[2] : null);
  const [colorPrefs3, setColorPrefs3] = useState(user ? user[0].colorPrefs[3] : null);
  const [colorPrefs4, setColorPrefs4] = useState(user ? user[0].colorPrefs[4] : null);

  const handleColorPrefs0 = event => {
    setColorPrefs0(event.target.value);
  };
  const handleColorPrefs1 = event => {
    setColorPrefs1(event.target.value);
  };
  const handleColorPrefs2 = event => {
    setColorPrefs2(event.target.value);
  };
  const handleColorPrefs3 = event => {
    setColorPrefs3(event.target.value);
  };
  const handleColorPrefs4 = event => {
    setColorPrefs4(event.target.value);
  };


  const [fontPrefs0, setFontPrefs0] = useState(user ? user[0].fontPrefs[0] : null);
  const [fontPrefs1, setFontPrefs1] = useState(user ? user[0].fontPrefs[1] : null);
  const [fontPrefs2, setFontPrefs2] = useState(user ? user[0].fontPrefs[2] : null);

  const handleFontPrefs0 = event => {
    setFontPrefs0(event.target.value);
  };
  const handleFontPrefs1 = event => {
    setFontPrefs1(event.target.value);
  };
  const handleFontPrefs2 = event => {
    setFontPrefs2(event.target.value);
  };


  /*        <iframe src="https://open.spotify.com/embed/playlist/7c53Vxz6Y6sNBNik6at8qU" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
          <h1 className={common.pageHeader}>{username}'s Profile</h1>
          {user && (<Paper className={classes.userDiv}>
            <div className={classes.bio}>Bio: {user[0].bio}</div>
            <div className={classes.email}>Email: {user[0].email}</div>
            
            {isOwnProfile && 
              <div>
                <div className={classes.prefsDiv}>
                  <span className={classes.prefs}>Primary Color 1: {selectTextField("colorPrefs1", "", colorPrefs0, handleColorPrefs0, colorOptions)}</span>
                  <span className={classes.prefs}>Primary Color 2: {selectTextField("colorPrefs2", "", colorPrefs1, handleColorPrefs1, colorOptions)}</span>
                  <span className={classes.prefs}>Background Color 3: {selectTextField("colorPrefs3", "", colorPrefs2, handleColorPrefs2, colorOptions)}</span>
                  <span className={classes.prefs}>Font Color: {selectTextField("colorPrefs4", "", colorPrefs3, handleColorPrefs3, colorOptions)}</span>
                  <span className={classes.prefs}>Header Color: {selectTextField("colorPrefs5", "", colorPrefs4, handleColorPrefs4, colorOptions)}</span>
                </div>
                <div className={classes.prefsDiv}>
                  <span className={classes.prefs}>Body Font: {selectTextField("fontPrefs1", "", fontPrefs0, handleFontPrefs0, fontOptions)}</span>
                  <span className={classes.prefs}>Header Font: {selectTextField("fontPrefs2", "", fontPrefs1, handleFontPrefs1, fontOptions)}</span>
                  <span className={classes.prefs}>Button Font: {selectTextField("fontPrefs3", "", fontPrefs2, handleFontPrefs2, fontOptions)}</span>
                </div>
              </div>
            }
          </Paper>)}
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
      {<div className={!isMobileView ? common.bodyDiv : common.mobileBodyDiv}>{body}</div>}
    </Grow>
  );
}

export default Profile;
