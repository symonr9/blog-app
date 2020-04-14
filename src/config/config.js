/***********************************************************************
 * File Name: config.js
 * Description: Handles the server URL for CRUD operations. 
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Configuration ******************************************************/
//Change this variable locally to use development server.
//Please make sure not to add this file into future commits if pushing 
//to master
const isDevelopmentServer = true;
/**********************************************************************/

const PROD_URL = "https://blog-app-backend-sy.herokuapp.com/";
const DEVL_URL = "http://localhost:2020/"

export const getServerURL = (param) => {
    let URL = PROD_URL;
    if(isDevelopmentServer){
        URL = DEVL_URL;
    }
    return URL + param.toString();
};