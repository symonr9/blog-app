/***********************************************************************
 * File Name: SortFilterBar.js
 * Description: Component for the SortFilterBar. This component is used 
 * on the browse pages (for Poetry, Quotes, Prose) to sort and filter 
 * the items. It is used on those pages.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Pagination from '@material-ui/lab/Pagination';
/**********************************************************************/

/* Project Imports ****************************************************/
import { colors, useCommonStyles } from "../assets/common";
/**********************************************************************/


const useStyles = makeStyles({
    topPagination: {
        float: 'right',
        backgroundColor: colors[2],
        borderRadius: '5px',
        padding: '5px'
      },
    mobileTopPagination: {
        float: 'left',
        backgroundColor: colors[2], 
        borderRadius: '5px',
        padding: '5px'
    },
    bottomPagination: {
        float: 'right',
        marginTop: '2em',
        marginBottom: '2em',
        backgroundColor: colors[2],
        borderRadius: '5px',
        padding: '5px'
    },
    mobileBottomPagination: {
        marginTop: '2em',
        marginBottom: '2em',
        backgroundColor: colors[2],
        borderRadius: '5px',
        padding: '5px'
    }
      
});

const paginationStyles = {
    marginLeft: '10em',
    width: '1em',
    color: 'white'
}
/**********************************************************************
 * Function Name: CoolPagination
 * Parameters: 
 * Description: Component for the CoolPagination.
 * Notes: None
 **********************************************************************/
const CoolPagination = params => {
    const classes = useStyles();
    const common = useCommonStyles();

    const type = params.type;

    //value: page selected
    const handlePageChange = (event, value) => {
        params.setPage(value);

        let newStartIndex = ((value - 1) * params.numOfItemsPerPage);
        if(value === 1){ 
        newStartIndex = 0;
        }

        params.setStartIndex(newStartIndex);

        //scroll to the top of the page.
        window.scrollTo(0, 0);
    };

    return (
        <span>
            {(<span className={
                !params.isMobileView ? 
                ((params.location === "top") 
                    ? classes.topPagination 
                    : classes.bottomPagination
                ) 
                : ((params.location === "top") 
                    ? classes.mobileTopPagination
                    : classes.bottomPagination)}>
                <Pagination 
                    count={params.numOfPages} 
                    color="secondary" 
                    page={params.page} 
                    classes={paginationStyles}
                    onChange={handlePageChange}
                    size="small"
                />
                </span>)}
        </span>
    );

}


export default CoolPagination;