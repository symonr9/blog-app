import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { colors, useCommonStyles } from "../assets/common";

import ReactTimeAgo from 'react-time-ago';

export const useStyles = makeStyles({
    text: {
      marginTop: '0.1em',
      fontSize: '1.1em',
      display: 'block',
      fontStyle: 'italic',
      whiteSpace: 'pre-wrap',
    },
    author: {
      fontSize: '1em',
      display: 'block',
      marginBottom: '1em',
    },
  });

const ItemCard = params => {
    const classes = useStyles();
    const common = useCommonStyles();

    //poetry, quotes, prose
    const type = params.type;

    const titleSection = (
        <NavLink to={params.link}>
            <span className={common.title}>{params.title}</span>
        </NavLink>
    );

    const createdBySection = (
        <span className={common.createdBy}>
            By {params.createdBy}
        </span>
    );

    const bodySection = (
        <span className={common.body}>{params.body}</span>
    );

    const createdAtSection = (
        <span className={common.createdAt}>
            created <ReactTimeAgo date={params.createdAt} />
        </span>
    );

    const textSection = (
        <NavLink to={params.link}>
            <span className={classes.text}>"{params.text}"</span>
        </NavLink>
    );

    const authorSection = (
        <span className={classes.author}>-{params.author}</span>
    );
  

    return (
        <Paper
        key={params.key}
        elevation={7}
        className={(!params.isMobileView && common.itemDiv || (params.isMobileView && common.mobileItemDiv))}>
            {(type == "poetry" || type == "prose") && titleSection}
            {(type == "poetry" || type == "prose") && createdBySection}
            {(type == "quotes") && textSection}
            {(type == "quotes") && authorSection}
            {(type == "poetry" || type == "prose") && bodySection}
            {createdAtSection}  
        </Paper>
    );

}


export default ItemCard;