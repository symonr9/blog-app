/***********************************************************************
 * File Name: Footer.js
 * Description: Component for the Footer section.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

 /* Library Imports ****************************************************/
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
/**********************************************************************/

import { colors } from "../assets/common";

const useStyles = makeStyles({
	footerDiv: {
        padding: '1.5em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: colors[4],
            '& :hover': {
                color: colors[3]
            }
        },
        background: colors[1],
        left: '0',
        bottom: '0',
    }
});

/**********************************************************************
 * Function Name: Footer
 * Parameters: None
 * Description: Component for Footer.
 * Notes: None
 **********************************************************************/
function Footer() {
    const classes = useStyles();

    //Fixme: Taking out for the time being
    //            <a href="https://github.com/symonr9/blog-app" target="_blank">Developed with React, NodeJS, and mongoDB</a>
    return (
        <div className={classes.footerDiv}>

        </div>
    );
}

export default Footer;
