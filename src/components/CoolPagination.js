/***********************************************************************
 * File Name: SortFilterBar.js
 * Description: Component for the SortFilterBar. This component is used 
 * on the browse pages (for Poetry, Quotes, Prose) to sort and filter 
 * the items. It is used on those pages.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React from "react";

import Pagination from '@material-ui/lab/Pagination';
/**********************************************************************/

/* Project Imports ****************************************************/
import { colors, useCommonStyles } from "../assets/common";
/**********************************************************************/



/**********************************************************************
 * Function Name: CoolPagination
 * Parameters: 
 * Description: Component for the CoolPagination.
 * Notes: None
 **********************************************************************/
const CoolPagination = params => {
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
                    ? common.topPagination 
                    : common.bottomPagination
                ) 
                : ((params.location === "top") 
                    ? common.mobileTopPagination
                    : common.bottomPagination)}>
                <Pagination 
                    count={params.numOfPages} 
                    color="secondary" 
                    page={params.page} 
                    onChange={handlePageChange}
                />
                </span>)}
        </span>
    );

}


export default CoolPagination;