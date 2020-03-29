import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { getData, postData } from "../../services/api";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";

import { Button, Grow, Grid, TextField, Paper, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import useCommonStyles from "../../assets/common";
import { getServerURL } from "../../config/config";

import {
  submitBtn,
  basicTextField,
  selectTextField
} from "../../components/FormElements";

import { useStyles, poemTypes, kinds } from "./exports";

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

  const [word, setWord] = useState("");
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

  const handleKindChange = event => {
    setKind(event.target.value);
  };

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const onSubmit = data => {
    setIsSnackbarOpen(true);
    console.log(data);
  };

  const onWordChange = event => {
    setWord(event.target.value);
  };

  const onWordLookup = () => {
    var data = { word: word, kind: kind };

    postData(getServerURL("words"), data, response => {
      const { data } = response;
      let temp = [];
      data.forEach(dataArr => {
        let tempArr = [];
        tempArr.push(dataArr.word);
        tempArr.push(dataArr.rating);
        temp.push(tempArr);
      });
      setWords(temp);
    });
  };

  const types = [
    {
      value: "poetry",
      label: "compose a poem",
      formInput: (
        <div>
          {basicTextField("title", "Title")}
          {basicTextField("body", "Body", 8)}
          {basicTextField("poemType", "Type of your poem")}
          {basicTextField("notes", "Notes", 2)}
          {submitBtn("Publish")}
        </div>
      )
    },
    {
      value: "quotes",
      label: "remember a quote",
      formInput: (
        <div>
          {basicTextField("text", "A quote to remember", 3)}
          {basicTextField("author", "Who said it?")}
          {submitBtn("Publish")}
        </div>
      )
    },
    {
      value: "prose",
      label: "write some prose",
      formInput: (
        <div>
          {basicTextField("title", "Title")}
          {basicTextField("body", "Body", 12)}
          {submitBtn("Publish")}
        </div>
      )
    },
    {
      value: "lists",
      label: "make a list",
      formInput: (
        <div>
          {submitBtn("Publish")}
        </div>
      )
    }
  ];

  const body = (
    <Grid container>
      <Grid item xs={12}>
        {!isMobileView && (<div className={common.spacingTop}></div>)}
        <h1>Create</h1>
      </Grid>
      <Grid item xs={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isMobileView && (selectTextField(
            "poemType",
            "What would you like to do?",
            type,
            handleTypeChange,
            types))
            ||
            (isMobileView && (
              selectTextField(
                "poemType",
                "Select type",
                type,
                handleTypeChange,
                types)
            ))
          }
          {formInput}
        </form>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={5}>
        <div classes={common.formDiv}>
          <TextField
            label="Look a word up"
            variant="outlined"
            onChange={onWordChange}
            fullWidth
            className={classes.spacing}
          ></TextField>
          {!isMobileView && (selectTextField(
            "kind",
            "What would you like to explore?",
            kind,
            handleKindChange,
            kinds
            ))
            ||
            (isMobileView && (
              selectTextField(
                "kind",
                "What to search?",
                kind,
                handleKindChange,
                kinds
                )
            ))
          }
          <Button 
            variant="outlined" 
            onClick={onWordLookup}
            className={classes.spacing}>
            Look
          </Button>
          {words != null && (
            <Paper className={(!isMobileView && classes.wordCardContainer || (isMobileView && classes.mobileWordCardContainer))}>
              {words.map(option => (
                <Paper className={(!isMobileView && classes.wordCard || (isMobileView && classes.mobileWordCard))}>
                  <span className={(!isMobileView && classes.word || (isMobileView && classes.mobileWord))}>{option[0]}</span>
                  <span className={(!isMobileView && classes.rating || (isMobileView && classes.mobileRating))}>{option[1]}</span>
                </Paper>
              ))}
            </Paper>
          )}
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
          Successfully published!
        </MuiAlert>
      </Snackbar>
        </div>
      </Grid>
    </Grid>
  );

  return (
    <Grow in={true}>
      {<div className={(!isMobileView && common.bodyDiv || (isMobileView && common.mobileBodyDiv))}>{body}</div>}
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
