/***********************************************************************
 * File Name: Footer.js
 * Description: Component for the Footer section.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

 /* Library Imports ****************************************************/
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
/**********************************************************************/

const useStyles = makeStyles({
	footerDiv: {
        boxShadow: '0 -1px 1px rgba(0,0,0,0.2)',
        padding: '1em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'black',
            '& :hover': {
                color: 'gold'
            }
        }
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

    return (
        <div className={classes.footerDiv}>
            <a href="https://github.com/symonr9/portfolio-website" target="_blank">Created by Symon Ramos :)</a>
        </div>
    );
}

export default Footer;
