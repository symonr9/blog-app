/***********************************************************************
 * File Name: index.js
 * Description: Has the ReactDOM that renders the application.
 * Notes: This file is ran within the /public/index.html file.
 * It's the first file to get run, the parent script.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


/* Library Imports ****************************************************/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';


/**********************************************************************/


/* Project Imports ****************************************************/
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './services/redux/store';
/**********************************************************************/


// Initialize the desired locales. This is necessary to use
// the JavascriptTimeAgo library.
JavascriptTimeAgo.locale(en);



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
