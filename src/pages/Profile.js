import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
});

function Profile() {
  const classes = useStyles();

  return (
    <div>
        Profile
    </div>
  );

}



export default Profile;
