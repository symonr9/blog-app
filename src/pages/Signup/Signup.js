import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { getData, postData } from "../../services/api";
import { Paper, Grow, Grid } from "@material-ui/core";

import useCommonStyles from "../../assets/common";
import { getServerURL } from "../../config/config";

import {
  submitBtn,
  basicTextField
} from "../../components/FormElements";

import { useStyles } from "./exports";

const Signup = () => {
  const classes = useStyles();
  const common = useCommonStyles();

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
  }, []);

  const { handleSubmit, register, watch, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
    postData(
      getServerURL("users/signup"),
      data,
      response => {
        const { token } = response;
        console.log(token);
      }
    );
  };

  const body = (
    <Grid container>
      <Grid item xs={12}>
      {!isMobileView && (<div className={common.spacingTop}></div>)}
        <h1>Signup</h1>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {basicTextField("email", "Email")}
          {basicTextField("username", "Username")}
          {basicTextField("password", "Password")}
          {submitBtn("Submit")}
        </form>
      </Grid>
    </Grid>
  );

  return (
    <Grow in={true}>
      {(!isMobileView && <div className={common.bodyDiv}>{body}</div>) ||
        (isMobileView && <div className={common.mobileBodyDiv}>{body}</div>)}
    </Grow>
  );
};

export default Signup;
