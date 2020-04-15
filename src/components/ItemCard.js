/***********************************************************************
 * File Name: ItemCard.js
 * Description: Component for the ItemCard section. This component is
 * rendered on the Poetry, Prose, and Quotes page. Data is pulled from 
 * the server and the mongoDB. Depending on the data type, the rendering
 * of the ItemCard differs.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React from "react";
import { NavLink } from "react-router-dom";

import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ReactTimeAgo from 'react-time-ago';
/**********************************************************************/

/* Project Imports ****************************************************/
import { colors, useCommonStyles } from "../assets/common";

/**********************************************************************/

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


/**********************************************************************
 * Function Name: ItemCard
 * Parameters: The expected parameters differ based on the "type"  
 * parameter that is passed into the component upon use. The types and 
 * parameters are as follows: 
 *      - poetry
 *          - key, isMobileView, link, title, createdBy, body, createdAt
 *      - quotes
 *          - key, isMobileView, link, text, author, createdAt
 *      - prose
 *          - key, isMobileView, link, title, createdBy, body, createdAt
 * 
 * Description: This component is rendered on the Poetry, Prose, and 
 * Quotes page. Data is pulled from the server and the mongoDB. 
 * Depending on the data type, the rendering of the ItemCard differs.
 * Notes: None
 **********************************************************************/
const ItemCard = params => {
    const classes = useStyles();
    const common = useCommonStyles();

    const type = params.type;

    const titleSection = (
        <NavLink to={params.link}>
            <span className={common.title}>{params.title}</span>
        </NavLink>
    );

    const createdBySection = (
        <NavLink to={"profile" + "/" + params.createdBy}>
            <span className={common.createdBy}>
                By {params.createdBy}
            </span>
        </NavLink>  
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
  

    //Different JSX elemnts are rendered based on ItemCard type.
    return (
        <Paper
        key={params.key}
        elevation={7}
        className={(!params.isMobileView && common.itemDiv || (params.isMobileView && common.mobileItemDiv))}>
            {(type === "poetry" || type === "prose") && titleSection}
            {(type === "poetry" || type === "prose") && createdBySection}
            {(type === "quotes") && textSection}
            {(type === "quotes") && authorSection}
            {(type === "poetry" || type === "prose") && bodySection}
            {createdAtSection}  
        </Paper>
    );
}

export default ItemCard;