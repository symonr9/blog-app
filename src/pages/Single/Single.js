
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { Button, Grow, Grid, CircularProgress, Modal, Backdrop, Fade, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { getData, deleteRequest } from "../../services/api";
import { colors, useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import ReactTimeAgo from 'react-time-ago';

import { useStyles } from "./exports";

import Comments from "../../components/Comments";


function Single() {  
  //type is poetry, quotes, prose
  const { type, urlId } = useParams();

  const classes = useStyles();
  const common = useCommonStyles();

  const [data, setData] = useState(null);
  const [_id, setId] = useState("");

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
  }, []);

  //prose, quotes, poetry
  const fetchData = isSubscribed => {
    getData(getServerURL(type + "/" + urlId), response => {
      if (isSubscribed) {
        setData(response);
        setId(response._id);
      }
    });
  };

  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && fetchData(isSubscribed);
    return () => (isSubscribed = false);
  }, []);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const [isDeleteConfim, setIsDeleteConfirm] = useState(false);

  const handleDeleteBtnClick = () => {
    setIsDeleteConfirm(!isDeleteConfim);
  };

  const handleDelete = () => {
    let url = "";

    switch(type){
      case "poetry":
        url = "poems/delete/" + _id;
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

    console.log("URL: ", getServerURL(url));
    deleteRequest(
      getServerURL(url),
      response => {
        console.log(response);
      }
    );

    setIsSnackbarOpen(true);
  };


  const bodyContent = (
    <div>
      {
      (data 
        && ( type == "poetry" && 
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
              type == "quotes" &&
              (<div>
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
              type == "prose" && 
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
          <br/><br/>
        </div>
        <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="info">
            Successfully deleted!
          </MuiAlert>
        </Snackbar>
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
