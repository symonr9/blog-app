
/***********************************************************************
 * File Name: Single.js
 * Description: Single page. Renders the component to create the page 
 * based on the url parameter and the type passed in.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { useHistory } from "react-router-dom"; 
import { useSelector } from "react-redux";

import { Button, Grow, Grid, CircularProgress, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import ReactTimeAgo from 'react-time-ago';
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData, deleteData } from "../../services/api";
import { useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";
import { useStyles } from "./exports";

import Comments from "../../components/Comments";
/**********************************************************************/


/**********************************************************************
 * Function Name: Single
 * Parameters: None
 * Description: Component for the Single page.
 * Notes: None
 **********************************************************************/
function Single() {  
  /* Authentication Handling ********************************************/
  const sessionUsername = useSelector(state => state.username);

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!sessionUsername;

  const history = useHistory();
  /**********************************************************************/

  const { type, urlId } = useParams();

  const classes = useStyles();
  const common = useCommonStyles();

  //Data type for these hooks are arrays.
  //data can be poetry, quotes, or prose depending on the type.
  const [data, setData] = useState(null);
  const [_id, setId] = useState("");
  const [isValidUser, setIsValidUser] = useState(false);

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
 * Description: Fetches the data of the item being looked at. 
 * Notes: None
 **********************************************************************/
  const fetchData = isSubscribed => {
    //GETs the data from the server. URI determined by url params.
    getData(getServerURL(type + "/" + urlId), response => {
      if (isSubscribed) {
        setData(response);
        setId(response._id);

        if((response.createdBy === sessionUsername) && (isLoggedIn)){
          setIsValidUser(true);
        }
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

  /* Snackbar ***********************************************************/
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };
  /**********************************************************************/


  /* Delete Item Functionality ******************************************/
  const [isDeleteConfim, setIsDeleteConfirm] = useState(false);

  const handleDeleteBtnClick = () => {
    setIsDeleteConfirm(!isDeleteConfim);
  };

  const handleDelete = () => {
    let url = "";

    if(isValidUser){
      //type is defined based on the initial Select input value.
      switch(type){
        case "poetry":
          url = "poetry/delete/" + _id;
          break;
        case "quotes":
          url = "quotes/delete/" + _id;
          break;
        case "prose":
          url = "prose/delete/" + _id;
          break;
        default:
          console.log("Something went wrong..."); 
          return 0;
      }

      //Delete Request for DELETE on the server.
      deleteData(
        getServerURL(url),
        response => {
          console.log(response);
          setIsSnackbarOpen(true);
          setTimeout(() => {
            history.push("/");
          }, 2000);
        }
      );
    }
  };
  /**********************************************************************/

  
  //Dynamically determine the body content for the form.
  const bodyContent = (
    <div>
      {
      (data 
        && ( type === "poetry" && 
              (<div>
                <h1>{data.title}</h1>
                {data.createdBy}
                <br/>
                created <ReactTimeAgo date={data.createdAt} />
                <br/><br/>
                {data.body}
                <br/><br/>
                Type: {data.type}
                <br/>
                Notes: {data.notes}
                <br/><br/><br/>
              </div>)
              ||
              type === "quotes" &&
              (<div>
                <br/><br/>
                <h1><i>"{data.text}"</i></h1>
                <br/><br/>
                {data.author}
                <br/><br/>
                {data.createdBy}
                <br/>
                created <ReactTimeAgo date={data.createdAt} />
                <br/><br/><br/>              
              </div>)
              ||
              type === "prose" && 
              (<div>
                <h1>{data.title}</h1>
                {data.createdBy}
                <br/>
                 created <ReactTimeAgo date={data.createdAt} />
                <br/><br/>
                {data.body}
                <br/><br/><br/>
              </div>)
              ||
              (<div>Sorry, this does not exist.</div>)
            )
      )
      }
      <br/>
    </div>
  );

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <div className={classes.singleContainerDiv}>
          {(data && bodyContent) ||
            (!data && (
              <div>
                <CircularProgress />
              </div>
            ))}

          {isValidUser && (
            <span>
              <NavLink to={`/${type}/${urlId}/edit`}>
                  <Button variant="contained">Edit</Button>
                </NavLink>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="contained" color="secondary" onClick={handleDeleteBtnClick}>Delete</Button>
                  <br/><br/>
                  {isDeleteConfim && 
                    <div>
                        Are you sure? &nbsp;&nbsp;&nbsp;
                        <Button variant="contained" color="secondary" onClick={handleDelete}>Yes</Button>
                    </div>}
              <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="info">
                  Successfully deleted!
                </MuiAlert>
              </Snackbar>
            </span>
          )}
          <br/><br/>
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

export default Single;
