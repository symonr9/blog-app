import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { getData, postData } from "../services/api";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";
import { Button, Grow, Grid, TextField, MenuItem } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import useCommonStyles from "../assets/common";

import {
  submitBtn,
  basicTextField,
  selectTextField
} from "../components/FormElements";

const useStyles = makeStyles({});

const poemTypes = [
  {
    value: "Prose",
    label: "Prose"
  },
  {
    value: "Iambic Pentameter",
    label: "Iambic Pentameter"
  },
  {
    value: "Sonnet",
    label: "Sonnet"
  },
  {
    value: "Custom",
    label: "Custom"
  }
];

function Create() {
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

  const [type, setType] = useState("");
  const [formInput, setFormInput] = useState(
    <div className={common.blankDiv}></div>
  );

  const [word, setWord] = useState("test");
  const [kind, setKind] = useState("rhymes");
  const [words, setWords] = useState(null);

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
  };

  const onWordLookup = () => {
    // console.log(word, kind);
    console.log("in onWordLookup function!");
    var data = { word: word, kind: kind };

    postData("http://localhost:2020/words", data, response => {
      const { data } = response;
      console.log("Post data returned");
      console.log(data);

      setWords(JSON.parse(data));
    });
  };

  const types = [
    {
      value: "poetry",
      label: "compose a poem",
      formInput: (
        <div className={common.formDiv}>
          {basicTextField("title", "Title")}
          {basicTextField("body", "Body", 8)}
          {basicTextField("poemType", "Type of your poem")}
          {basicTextField("notes", "Notes", 2)}
          <div className={common.submitBtnDiv}>{submitBtn}</div>
        </div>
      )
    },
    {
      value: "quotes",
      label: "remember a quote",
      formInput: (
        <div className={common.formDiv}>
          {basicTextField("text", "A quote to remember", 3)}
          {basicTextField("author", "Who said it?")}
          <div className={common.submitBtnDiv}>{submitBtn}</div>
        </div>
      )
    },
    {
      value: "prose",
      label: "write some prose",
      formInput: (
        <div className={common.formDiv}>
          {basicTextField("title", "Title")}
          {basicTextField("body", "Body", 12)}
          <div className={common.submitBtnDiv}>{submitBtn}</div>
        </div>
      )
    },
    {
      value: "lists",
      label: "make a list",
      formInput: (
        <div className={common.formDiv}>
          <div className={common.submitBtnDiv}>{submitBtn}</div>
        </div>
      )
    }
  ];

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <h1>Create</h1>
        <Button variant="contained" color="secondary" onClick={onWordLookup}>
          Look up Dance
        </Button>
        {words}
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {selectTextField(
            "poemType",
            "Please select a type",
            type,
            handleTypeChange,
            types
          )}
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

/*

          <MuiThemeProvider theme={defaultTheme}>
            <MUIRichTextEditor
              id="rteId"
              name="body"
              inlineToolBar={true}
              placeholder="Start writing..."
              variant="outlined"
              fullWidth
              inputRef={rtePoemInput}
              onClick={handleRTEClick}
              className={classes.formInput}
            />
          </MuiThemeProvider>

        
*/
