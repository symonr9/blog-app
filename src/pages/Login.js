import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { getData, postData } from "../services/api";
import { Paper, Grow, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import useCommonStyles from "../assets/common";

const useStyles = makeStyles({});

const Login = () => {
  const classes = useStyles();
  const common = useCommonStyles();

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 768px)").addListener(handler);
  }, []);

  const { handleSubmit, register, watch, errors } = useForm();
  
  const onSubmit = data => {
    console.log(data)
  };

  //fixme
  console.log(watch('example'));

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <h1>Login</h1>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input
        name="email"
        ref={register({
          required: 'Required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "invalid email address"
          }
        })}
      />
      {errors.email && errors.email.message}
      <input
        name="password"
        ref={register({
          required: 'Required'
        })}
      />
      {errors.password && errors.password.message}
      <button type="submit">Submit</button>
        </form>
        login
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

export default Login;
