/***********************************************************************
 * File Name: Admin.js
 * Description: Admin page. 
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React, { useEffect, useState, forwardRef } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import { Grow, Grid, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
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
import zIndex from "@material-ui/core/styles/zIndex";


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

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!sessionUsername;

  const history = useHistory();

  //FIXME: for now, only allow myself access to this page.
  if(sessionUsername !== "sy"){
    history.push("/redirect");
  }
  /**********************************************************************/
  
  const classes = useStyles();
  const common = useCommonStyles();

  const [poetry, setPoetry] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [prose, setProse] = useState([]);

  const [dataChanged, setDataChanged] = useState(false);

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

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

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
          items[i].itemType = "poetry";
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
          items[i].itemType = "quotes";
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
          items[i].itemType = "prose";
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
  }, [dataChanged]);

  const PoetryColumns = [
    { title: 'Item Type', field: 'itemType', initialEditValue: 'poetry' },
    { title: 'ID', field: '_id', hidden: true },
    { title: 'Title', field: 'title' },
    { title: 'Type', field: 'type' },
    { title: 'Notes', field: 'notes' },
    { title: 'Body', field: 'body', render: row => <span>{row.body.substring(0,100) + "..."}</span> },
    { title: 'Is Public', field: 'isPublic' },
    { title: 'Created By', field: 'createdBy', readonly: true },
    { title: 'Created At', field: 'createdAt', readonly: true }
  ];

  const QuotesColumns = [
    { title: 'Item Type', field: 'itemType', initialEditValue: 'quotes' },
    { title: 'ID', field: '_id', hidden: true },
    { title: 'Text', field: 'text', render: row => <span>{row.text.substring(0,100) + "..."}</span> },
    { title: 'Author', field: 'author' },
    { title: 'Is Public', field: 'isPublic' },
    { title: 'Created By', field: 'createdBy', readonly: true },
    { title: 'Created At', field: 'createdAt', readonly: true }
  ];

  const ProseColumns = [
    { title: 'Item Type', field: 'itemType', initialEditValue: 'prose' },
    { title: 'ID', field: '_id', hidden: true },
    { title: 'Title', field: 'title' },
    { title: 'Body', field: 'body', render: row => <span>{row.body.substring(0,100) + "..."}</span> },
    { title: 'Is Public', field: 'isPublic' },
    { title: 'Created By', field: 'createdBy', readonly: true },
    { title: 'Created At', field: 'createdAt', readonly: true }
  ];


  //title, body
  const handleRowAdd = (event) => {
    let data = {};
    let url = "";

    console.log(event);

    if(isLoggedIn){
      //type is defined based on the initial Select input value.
      switch(event.itemType){
        case "poetry":
          data = {
            "title": event.title,
            "body": event.body, 
            "type": event.type,
            "notes": event.notes,
            "createdBy": event.createdBy,
            "isPublic": event.isPublic
          };
          url = "poetry/create";

          break;
        case "quotes":
          data = {
            "text": event.text,
            "author": event.author,
            "createdBy": event.createdBy,
            "isPublic": event.isPublic
          }; 
          url = "quotes/create";
        
          break;
        case "prose":
          data = {
            "title": event.title,
            "body": event.body,
            "createdBy": event.createdBy,
            "isPublic": event.isPublic
          };
          url = "prose/create";

          break;
        default:
          console.log("Something went wrong..."); 
          return 0;
      }

      return axios.post(getServerURL(url), data, {	header: {
        'Content-Type': 'application/json'
      }})
      .then(response => {
        return fetchData(true);
      })
      .catch(error => {
        console.error(error)
      });

    }
  };

  const handleRowUpdate = (event) => {
    let data = {};
    let url = "";

    if(isLoggedIn){
      //type is defined based on the initial Select input value.
      switch(event.itemType){
        case "poetry":
          data = {
            "title": event.title,
            "body": event.body, 
            "type": event.type,
            "notes": event.notes,
            "isPublic": event.isPublic,
            "createdBy": event.createdBy,
          };
          url = "poetry/edit/" + event._id;

          break;
        case "quotes":
          data = {
            "text": event.text,
            "author": event.author,
            "isPublic": event.isPublic,
            "createdBy": event.createdBy,
          }; 
          url = "quotes/edit/" + event._id;
        
          break;
        case "prose":
          data = {
            "title": event.title,
            "body": event.body,
            "isPublic": event.isPublic,
            "createdBy": event.createdBy,
          };
          url = "prose/edit/" + event._id;

          break;
        default:
          console.log("Something went wrong..."); 
          return 0;
      }

      return axios.put(getServerURL(url), data, {	header: {
        'Content-Type': 'application/json'
      }})
      .then(response => {
        return fetchData(true);
      })
      .catch(error => {
        console.error(error)
      });
      
    }
  };

  const handleRowDelete = (event) => {
    let url = "";

    if(isLoggedIn){
      //type is defined based on the initial Select input value.
      switch(event.itemType){
        case "poetry":
          url = "poetry/delete/" + event._id;
          break;
        case "quotes":
          url = "quotes/delete/" + event._id;
          break;
        case "prose":
          url = "prose/delete/" + event._id;
          break;
        default:
          console.log("Something went wrong..."); 
          return 0;
      }

      return axios.delete(getServerURL(url))
      .then(response => {
        return fetchData(true);
      })
      .catch(error => {
        console.error(error)
      });

    }
  };


  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1>Admin</h1>
        <MaterialTable
          title="Poetry"
          columns={PoetryColumns}
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
          columns={QuotesColumns}
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
          columns={ProseColumns}
          data={prose}
          editable={{
            onRowAdd: handleRowAdd,
            onRowUpdate: handleRowUpdate,
            onRowDelete: handleRowDelete,
          }}
          icons={tableIcons} 
        />
        <br/>
        <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
            Successful operation!
          </MuiAlert>
        </Snackbar>
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
