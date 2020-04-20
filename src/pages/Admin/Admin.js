/***********************************************************************
 * File Name: Admin.js
 * Description: Admin page. 
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React, { useEffect, useState, forwardRef } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Grow, Grid, CircularProgress } from "@material-ui/core";
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData, postData, putData, deleteData } from "../../services/api";
import { useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import ItemCard from '../../components/ItemCard';

import { useStyles } from "./exports";


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };  
/**********************************************************************/



/**********************************************************************
 * Function Name: Admin
 * Parameters: None
 * Description: Component for the Admin page.
 * Notes: None
 **********************************************************************/
function Admin() {
  /* Authentication Handling ********************************************/
  const sessionUsername = useSelector(state => state.username);

  //FIXME: for now, only allow myself access to this page.
  if(sessionUsername !== "sy"){
    history.push("/redirect");
  }

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!sessionUsername;

  const history = useHistory();
  /**********************************************************************/
  
  const classes = useStyles();
  const common = useCommonStyles();

  const [poetry, setPoetry] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [prose, setProse] = useState([]);

  /* Mobile View Handler ************************************************/
  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );

  //Adds a listener to re-render the component when the window width changes.
  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
  }, []);
  /**********************************************************************/

  /**********************************************************************
 * Function Name: fetchData
 * Parameters: isSubscribed variable ensures that the component isn't
 * loaded until after the fetch request is completed.
 * Description: Fetches the data of the items being looked at. 
 * Notes: None
 **********************************************************************/
  const fetchData = isSubscribed => {
    getData(getServerURL("poetry"), response => {
      if (isSubscribed) {
        let items = response.sort(() => {
          return 0.5 - Math.random();
        }); 
        for(let i = 0; i < items.length; i++){
          items[i].type = "poetry";
          items[i].body = items[i].body.substring(0,100) + "...";
        }
        setPoetry(items);
      }
    });
    getData(getServerURL("quotes"), response => {
      if (isSubscribed) {
        let items = response.sort(() => {
          return 0.5 - Math.random();
        }); 
        for(let i = 0; i < items.length; i++){
          items[i].type = "quotes";
          items[i].text = items[i].text.substring(0,100) + "...";
        }
        setQuotes(items);
      }
    });
    getData(getServerURL("prose"), response => {
      if (isSubscribed) {
        let items = response.sort(() => {
          return 0.5 - Math.random();
        }); 
        for(let i = 0; i < items.length; i++){
          items[i].type = "prose";
          items[i].body = items[i].body.substring(0,100) + "...";
        }
        setProse(items);
      }
    });
  };

  //Run fetchData on the first render. When the second parameter is an 
  //empty array, the useEffect function will only be executed on page load.
  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && fetchData(isSubscribed);
    return () => (isSubscribed = false);
  }, []);

  const columns = [
    { title: 'Type', field: 'type', hidden: true },
    { title: 'Title', field: 'title' },
    { title: 'Body', field: 'body' },
    { title: 'Created By', field: 'createdBy', readonly: true },
    { title: 'Created At', field: 'createdAt', readonly: true }
  ];

  const QuoteColumns = [
    { title: 'Type', field: 'type', hidden: true },
    { title: 'Text', field: 'text' },
    { title: 'Author', field: 'author' },
    { title: 'Created By', field: 'createdBy', readonly: true },
    { title: 'Created At', field: 'createdAt', readonly: true }
  ];

  //title, body
  const handleRowAdd = (event) => {
    console.log(event);
  };

  const handleRowUpdate = (event) => {
    console.log(event);
  };

  const handleRowDelete = (event) => {
    console.log(event);
  };


  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>Admin</h1>
        <MaterialTable
          title="Poetry"
          columns={columns}
          data={poetry}
          editable={{
            onRowAdd: handleRowAdd,
            onRowUpdate: handleRowUpdate,
            onRowDelete: handleRowDelete,
          }}
          icons={tableIcons} 
        />
        <br/>
        <MaterialTable
          title="Quotes"
          columns={QuoteColumns}
          data={quotes}
          editable={{
            onRowAdd: handleRowAdd,
            onRowUpdate: handleRowUpdate,
            onRowDelete: handleRowDelete,
          }}
          icons={tableIcons} 
        />
        <br/>
        <MaterialTable
          title="Prose"
          columns={columns}
          data={prose}
          editable={{
            onRowAdd: handleRowAdd,
            onRowUpdate: handleRowUpdate,
            onRowDelete: handleRowDelete,
          }}
          icons={tableIcons} 
        />
        <br/>
      </Grid>
    </Grid>
  );
  return (
    <Grow in={true}>
      {<div className={!isMobileView ? common.bodyDiv : common.mobileBodyDiv}>{body}</div>}
    </Grow>
  );
}

export default Admin;
