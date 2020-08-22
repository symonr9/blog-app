/***********************************************************************
 * File Name: SortFilterBar.js
 * Description: Component for the SortFilterBar. This component is used 
 * on the browse pages (for Poetry, Quotes, Prose) to sort and filter 
 * the items. It is used on those pages.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React from "react";

import { Chip, Tooltip, TextField, MenuItem } from "@material-ui/core";
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
import { fonts, colors, useCommonStyles } from "../assets/common";
/**********************************************************************/



/**
 * sortFilterBarDiv {
 *      sortMenu {
 *          searchBarInput { }
 *          sortDiv { }
 *          numOfItemsSelect { }
 *      }
 * }
 */
const useStyles = makeStyles({
    /** The Autocomplete Search Input requires customized styles. 
     ** These are inline. */ 
    sortDiv: {

    },
    mobileSortDiv: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '40%',
        height: '8em',
        marginLeft: '2em'
    },
    sortWidget: {
        cursor: 'pointer',
        color: 'white',
        fontSize: '3em',
        marginLeft: '0.5em',
    },
    mobileSortWidget: {
        cursor: 'pointer',
        color: 'white',
        fontSize: '3em',
        display: 'flex',
        marginLeft: '0.5em',
        marginBottom: '0.25em'
    },
    sortFilterBarDiv: {
        display: 'inline-block',
        marginBottom: '2em' 
    },
    mobileSortFilterBarDiv: {
        display: 'inline',
        marginBottom: '1em'
    },
    searchBarInput: {
        display: 'flex',
        marginLeft: '1.75em'
    },
    numOfItemsSelect: {
        display: 'flex',
        marginTop: '1em',
        width: '8em',
        marginBottom: '1em',
        marginLeft: '1.75em',
        color: colors[2],
        backgroundColor: colors[2],
        borderRadius: '5px'
    },
    mobileNumOfItemsSelect: {
        display: 'flex',
        marginTop: '1em',
        marginBottom: '1em',
        width: '40%',
        marginLeft: '1.75em',
        backgroundColor: colors[2],
        borderRadius: '5px'
    },
    sortMenu: {
    },

});

const searchBarStyle = { 
    width: '80%', 
    marginBottom: '1em',
    fontFamily: fonts[2],
    color: colors[3],
    backgroundColor: colors[2],
    borderRadius: '5px'
};

const chipStyle = {
    color: colors[5], 
    fontFamily: fonts[2],
    backgroundColor: colors[2], 
    marginRight: '0.75em', 
    marginBottom : '0.75em' 
};

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
        style={chipStyle}
        onClick={handleSortTitle} />
    );

    const authorChip = (
        <Chip icon={<FaceIcon style={{ color: colors[4] }}/>} 
        label="By Author" 
        style={chipStyle}
        onClick={handleSortAuthor} />
    );

    const dateChip = (
        <Chip icon={<ScheduleRoundedIcon style={{ color: colors[4] }}/>} 
        label="By Date"
        style={chipStyle}
        onClick={handleSortDate} />
    );
    
    const randomChip = (
        <Chip icon={<CasinoRoundedIcon style={{ color: colors[4] }}/>} 
        label="By Random"
        style={chipStyle}
        onClick={handleSortRandom} />
    );

    const fullTextChip = (
        <Chip icon={<ViewHeadlineRoundedIcon style={{ color: colors[4] }}/>} 
        label="View Full Text"
        style={chipStyle}
        onClick={handleIsFullText} />
    );

    const numOfItemsOptions = [
        {value: 9, label: '9'}, 
        {value: 18, label: '18'}, 
        {value: 27, label: '27'}, 
        {value: 45, label: '45'}
    ];

    const numOfItemsPerPageSelect = (
        <TextField
        id="numOfItemsPerPageSelect"
        name="numOfItemsPerPageSelect"
        label="Items to display?"
        variant="filled"
        value={params.numOfItemsPerPage}
        select
        onChange={handleNumOfItemsPerPageChange}
        fullWidth
        className={!params.isMobileView ? classes.numOfItemsSelect : classes.mobileNumOfItemsSelect}
        >
            {numOfItemsOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
            ))}
        </TextField>
    );

    //Different JSX elemnts are rendered based on the type passed in.
    const searchBar = (
        <Autocomplete
        options={(params.items != null && params.items)}
        groupBy={(option) => (((type ==="poetry" || type === "prose") && option.title[0].toUpperCase()) || (type === "quotes" && option.author.toUpperCase()))}
        getOptionLabel={(option) => ((type === "poetry" || type === "prose") && option.title) || ((type === "quotes") && option.text)}
        style={searchBarStyle}
        onChange={handleSearchChange}
        renderInput={(p) => <TextField {...p} label="Search" variant="outlined" />}
        />
    );

    //Different JSX elemnts are rendered based on the type passed in.
    const sortMenu = (
        <span className={classes.sortMenu}>
            <span className={classes.searchBarInput}>{searchBar}</span>
            <span className={!params.isMobileView ? classes.sortDiv : classes.mobileSortDiv}>
                {(type === "poetry" || type === "prose") && titleChip}
                {authorChip}
                {dateChip}
                {randomChip}
                {(type === "poetry" || type === "prose") && fullTextChip}
            </span>
            {numOfItemsPerPageSelect}
        </span>
    );

    return (
        <div className={!params.isMobileView ? classes.sortFilterBarDiv : classes.mobileSortFilterBarDiv}>
            <Tooltip title="Sort">
                <SortRoundedIcon fontSize="large" className={!params.isMobileView ? classes.sortWidget : classes.mobileSortWidget} onClick={handleSortMenuOpen}/>
            </Tooltip>
            {(params.isSortMenuOpen && (sortMenu))}
        </div>
    );

}


export default SortFilterBar;