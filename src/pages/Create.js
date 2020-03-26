import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { getData, postData } from "../services/api";

import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import {
  Button,
  Paper,
  Grow,
  Grid,
  TextField,
  MenuItem
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import useCommonStyles from "../assets/common";

const useStyles = makeStyles({
  blankDiv: {
    marginTop: "20em"
  },
  typeSelect: {
    marginBottom: '1em'
  },
  submitBtnDiv: {
    marginTop: '2em',
    marginBottom: '2em'
  },
  formInput: {
    marginTop: '0.5em'
  }
});

function Create() {
  const classes = useStyles();
  const common = useCommonStyles();

  const submitBtn = (
    <div className={classes.submitBtnDiv}>
    <Button
      variant="contained"
      color="primary"
      startIcon={<PublishRoundedIcon />}
      type="submit"
    >
      Publish
    </Button>
    </div>
  );
  const types = [
    {
      value: "poetry",
      label: "compose a poem",
      formInput: <div className={classes.formDiv}>
                       <TextField
            name="title"
            label="Title of your masterpiece"
            placeholder="Start writing..."
            variant="outlined"
            fullWidth
            className={classes.formInput}
          /> 
               <TextField
            name="body"
            label="Body of your masterpiece"
            multiline
            rows="10"
            placeholder="Start writing..."
            variant="outlined"
            fullWidth
            className={classes.formInput}
            />
          <TextField
            name="type"
            label="Type of your poem"
            placeholder="Start writing..."
            variant="outlined"
            fullWidth
            className={classes.formInput}
          /> 
          <TextField
            name="notes"
            label="Notes of your poem"
            multiline
            rows="2"
            placeholder="Start writing..."
            variant="outlined"
            fullWidth
            className={classes.formInput}
          /> 
        {submitBtn}</div>
    },
    {
      value: "quotes",
      label: "remember a quote",
      formInput: <div>{submitBtn}</div>
    },
    {
      value: "prose",
      label: "write some prose",
      formInput: <div>{submitBtn}</div>
    },
    {
      value: "lists",
      label: "make a list",
      formInput: <div>{submitBtn}</div>
    }
  ];

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 768px)").addListener(handler);
  }, []);

  const { handleSubmit, register, watch, errors } = useForm();

  const [type, setType] = useState("");
  const [formInput, setFormInput] = useState(
    <div className={classes.blankDiv}></div>
  );

  const handleTypeChange = event => {
    setType(event.target.value);

    types.map(({ value, formInput }) => {
      if (value === event.target.value) {
        setFormInput(formInput);
      }
    });
  };

  const onSubmit = data => {
    console.log(data);

    /*
    postData(
      "http://localhost:2020/users/login",
      data,
      response => {
        const { token } = response;
        console.log(token);
      }
    );
    */
  };

  console.log(watch("example"));

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <h1>Create</h1>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="typeSelectId"
            name="type"
            select
            label="I want to..."
            value={type}
            onChange={handleTypeChange}
            helperText="Please select a type"
            variant="outlined"
            className={classes.typeSelect}
          >
            {types.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {formInput}
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
}

export default Create;
