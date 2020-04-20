/***********************************************************************
 * File Name: SortFilterBar.js
 * Description: Component for the SortFilterBar. This component is used 
 * on the browse pages (for Poetry, Quotes, Prose) to sort and filter 
 * the items. It is used on those pages.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React from "react";

import { Chip, Tooltip, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';

import SortByAlphaRoundedIcon from '@material-ui/icons/SortByAlphaRounded';
import SortRoundedIcon from '@material-ui/icons/SortRounded';
import FaceIcon from '@material-ui/icons/Face';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import CasinoRoundedIcon from '@material-ui/icons/CasinoRounded';
import ViewHeadlineRoundedIcon from '@material-ui/icons/ViewHeadlineRounded';
/**********************************************************************/

/* Project Imports ****************************************************/
import { colors, useCommonStyles } from "../assets/common";

import { selectTextField } from "./FormElements";
/**********************************************************************/



const useStyles = makeStyles({
    searchBarInput: {

    },
    numOfItemsSelect: {

    }

});


/**********************************************************************
 * Function Name: SortFilterBar
 * Parameters: The expected parameters differ based on the "type"  
 * parameter that is passed into the component upon use. The types and 
 * parameters are as follows: 
 *      - poetry
 *          - items, isSortMenuOpen, setIsSortMenuOpen, sortTitle, 
 *          - setSortTitle, isFullText, setIsFullText, sortAuthor,
 *          - setSortAuthor, sortDate, setSortDate, sortRandom, 
 *          - setSortRandom, searchChange, setSearchChange
 *      - quotes
 *          - items, isSortMenuOpen, setIsSortMenuOpen, sortAuthor,
 *          - setSortAuthor, sortDate, setSortDate, sortRandom, 
 *          - setSortRandom, searchChange, setSearchChange
 *      - prose
 *          - items, isSortMenuOpen, setIsSortMenuOpen, sortTitle, 
 *          - setSortTitle, isFullText, setIsFullText, sortAuthor,
 *          - setSortAuthor, sortDate, setSortDate, sortRandom, 
 *          - setSortRandom, searchChange, setSearchChange
 * 
 * Description: Component for the SortFilterBar. This component is used 
 * on the browse pages (for Poetry, Quotes, Prose) to sort and filter 
 * the items.
 * Notes: None
 **********************************************************************/
const SortFilterBar = params => {
    const classes = useStyles();
    const common = useCommonStyles();

    const type = params.type;

    const handleSortMenuOpen = () => {
        params.setIsSortMenuOpen(!params.isSortMenuOpen);
      };
      
    const handleSortTitle = () => {
        params.setSortTitle(!params.sortTitle);
    };

    const handleSortAuthor = () => {
        params.setSortAuthor(!params.sortAuthor);
    }

    const handleSortDate = () => {
        params.setSortDate(!params.sortDate);
      };

    const handleSortRandom = () => {
        params.setSortRandom(!params.sortRandom);
    };

    const handleIsFullText = () => {
        params.setIsFullText(!params.isFullText);
    };

    const handleSearchChange = (event, obj) => {
        if(obj != null){
            if(type === "poetry" || type === "prose"){
                params.setSearchChange(obj.title);
            }
            else if(type === "quotes"){
                params.setSearchChange(obj.text);
            }
          
        }
    };

    const itemLength = params.items !== null ? params.items.length : 0;

    const handleNumOfItemsPerPageChange = (event, obj) => {
        if(obj.props.value < itemLength){
            params.setNumOfItemsPerPage(obj.props.value);
        }
    };

    const titleChip = (            
        <Chip icon={<SortByAlphaRoundedIcon style={{ color: colors[5] }}/>} 
        label="By Title" 
        style={{ color: colors[5], backgroundColor: colors[3], marginRight: '0.3em' }}
        onClick={handleSortTitle} />
    );

    const authorChip = (
        <Chip icon={<FaceIcon style={{ color: colors[4] }}/>} 
        label="By Author" 
        style={{ color: colors[5], backgroundColor: colors[3], marginRight: '0.3em' }}
        onClick={handleSortAuthor} />
    );

    const dateChip = (
        <Chip icon={<ScheduleRoundedIcon style={{ color: colors[4] }}/>} 
        label="By Date"
        style={{ color: colors[5], backgroundColor: colors[3], marginRight: '0.3em' }} 
        onClick={handleSortDate} />
    );
    
    const randomChip = (
        <Chip icon={<CasinoRoundedIcon style={{ color: colors[4] }}/>} 
        label="By Random"
        style={{ color: colors[5], backgroundColor: colors[3], marginRight: '0.3em' }} 
        onClick={handleSortRandom} />
    );

    const fullTextChip = (
        <Chip icon={<ViewHeadlineRoundedIcon style={{ color: colors[4] }}/>} 
        label="View Full Text"
        style={{ color: colors[5], backgroundColor: colors[3], marginRight: '0.3em' }} 
        onClick={handleIsFullText} />
    );

    const numOfItemsPerPageSelect = (
        selectTextField(
            "numOfItemsPerPageSelect",
            "Items to display?",
            params.numOfItemsPerPage,
            handleNumOfItemsPerPageChange,
            [
                {value: 9, label: '9'}, 
                {value: 18, label: '18'}, 
                {value: 27, label: '27'}, 
                {value: 45, label: '45'}])
    );

    //Different JSX elemnts are rendered based on the type passed in.
    const searchBar = (
        <Autocomplete
        options={(params.items != null && params.items)}
        groupBy={(option) => (((type ==="poetry" || type === "prose") && option.title[0].toUpperCase()) || (type === "quotes" && option.author.toUpperCase()))}
        getOptionLabel={(option) => ((type === "poetry" || type === "prose") && option.title) || ((type === "quotes") && option.text)}
        style={{ width: '30em', marginBottom: '1em' }}
        onChange={handleSearchChange}
        renderInput={(p) => <TextField {...p} label="Search" variant="outlined" />}
        />
    );

    //Different JSX elemnts are rendered based on the type passed in.
    const sortMenu = (
        <span>
            <span className={classes.searchBarInput}>{searchBar}</span>

            <span className={common.sortDiv}>
                {(type === "poetry" || type === "prose") && titleChip}
                {authorChip}
                {dateChip}
                {randomChip}
                {(type === "poetry" || type === "prose") && fullTextChip}
                <span className={classes.numOfItemsSelect}>{numOfItemsPerPageSelect}</span>
            </span>
        </span>
    );

    return (
        <div className={!params.isMobileView ? common.sortFilterBarDiv : common.mobileSortFilterBarDiv}>
            <Tooltip title="Sort">
                <SortRoundedIcon fontSize="large" className={common.sortWidget} onClick={handleSortMenuOpen}/>
            </Tooltip>
            {(params.isSortMenuOpen && (sortMenu))}
        </div>
    );

}


export default SortFilterBar;