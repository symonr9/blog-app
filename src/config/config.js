

const isDevelopmentServer = true;

const PROD_URL = "https://blog-app-backend-sy.herokuapp.com/";
const DEVL_URL = "http://localhost:2020/"

export const getServerURL = (param) => {
    let URL = PROD_URL;
    if(isDevelopmentServer){
        URL = DEVL_URL;
    }
    return  + param.toString();
};