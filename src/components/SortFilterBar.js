import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Chip, Tooltip, TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

import SortByAlphaRoundedIcon from '@material-ui/icons/SortByAlphaRounded';
import SortRoundedIcon from '@material-ui/icons/SortRounded';
import FaceIcon from '@material-ui/icons/Face';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';

import { colors, useCommonStyles } from "../assets/common";

const SortFilterBar = params => {
    const common = useCommonStyles();

    //poetry, quotes, prose
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

    const handleSearchChange = (event, obj) => {
        if(obj != null){
            if(type == "poetry" || type == "prose"){
                params.setSearchChange(obj.title);
            }
            else if(type == "quotes"){
                params.setSearchChange(obj.text);
            }
          
        }
    };

    const titleChip = (            
        <Chip icon={<SortByAlphaRoundedIcon style={{ color: colors[4] }}/>} 
        label="By Title" 
        style={{ color: colors[4], backgroundColor: colors[3], marginRight: '0.3em' }}
        onClick={handleSortTitle} />
    );

    const authorChip = (
        <Chip icon={<FaceIcon style={{ color: colors[4] }}/>} 
        label="By Author" 
        style={{ color: colors[4], backgroundColor: colors[3], marginRight: '0.3em' }}
        onClick={handleSortAuthor} />
    );

    const dateChip = (
        <Chip icon={<ScheduleRoundedIcon style={{ color: colors[4] }}/>} 
        label="By Date"
        style={{ color: colors[4], backgroundColor: colors[3], marginRight: '0.3em' }} 
        onClick={handleSortDate} />
    );

    const searchBar = (
        <Autocomplete
        options={(params.items != null && params.items)}
        groupBy={(option) => (((type == "poetry" || type == "prose") && option.title[0].toUpperCase()) || (type == "quotes" && option.author.toUpperCase()))}
        getOptionLabel={(option) => ((type == "poetry" || type == "prose") && option.title) || ((type == "quotes") && option.text)}
        style={{ width: 300 }}
        onChange={handleSearchChange}
        renderInput={(p) => <TextField {...p} label="Search" variant="outlined" />}
        />
    );

    const sortMenu = (
        <span>
            {searchBar}
            <span className={common.sortDiv}>
                {(type == "poetry" || type == "prose") && titleChip}
                {authorChip}
                {dateChip}
            </span>
        </span>
    );

    return (
        <div className={common.sortFilterBarDiv}>
            <Tooltip title="Sort">
                <SortRoundedIcon fontSize="large" className={common.sortWidget} onClick={handleSortMenuOpen}/>
            </Tooltip>
            {(params.isSortMenuOpen && (sortMenu)
            )}
        </div>
    );

}


export default SortFilterBar;