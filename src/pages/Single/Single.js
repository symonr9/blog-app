
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { Paper, Grow, Grid, CircularProgress } from "@material-ui/core";
import { getData } from "../../services/api";
import useCommonStyles from "../../assets/common";
import { getServerURL } from "../../config/config";

import { useStyles } from "./exports";

import Comments from "../../components/Comments";


function Single() {  
  const { type, urlId } = useParams();

  const classes = useStyles();
  const common = useCommonStyles();

  const [data, setData] = useState(null);

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 768px)").addListener(handler);
  }, []);

  let dataType = type;
    
  //fixme, fix this nomenclature
  if(type == "poetry"){
    dataType = "poems";
  }

  //prose, quotes, poems
  const fetchData = isSubscribed => {
    getData(getServerURL(dataType + "/" + urlId), response => {
      if (isSubscribed) {
        setData(response);
      }
    });
  };

  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && fetchData(isSubscribed);
    return () => (isSubscribed = false);
  }, []);

  const bodyContent = (
    <div>
      {
      (data 
        && ( dataType == "poems" && 
              (<div>
                <h1>{data.title}</h1>
                {data.createdBy}
                <br/>
                {data.createdAt}
                <br/><br/>
                {data.body}
                <br/><br/>
                Type: {data.type}
                <br/>
                Notes: {data.notes}
                <br/><br/><br/>
              </div>)
              ||
              dataType == "quotes" &&
              (<div>
                <i>"{data.text}"</i>
                <br/><br/>
                {data.author}
                <br/><br/>
                {data.createdBy}
                <br/>
                {data.createdAt}
                <br/><br/><br/>              
              </div>)
              ||
              dataType == "prose" && 
              (<div>
                <h1>{data.title}</h1>
                {data.createdBy}
                <br/>
                {data.createdAt}
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
