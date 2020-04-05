import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { getData, postData } from "../../services/api";

import ViewColumnRoundedIcon from '@material-ui/icons/ViewColumnRounded';
import ViewStreamRoundedIcon from '@material-ui/icons/ViewStreamRounded';

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";

import { Button, Grow, Grid, TextField, Paper, Snackbar, IconButton  } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import useCommonStyles from "../../assets/common";
import { getServerURL } from "../../config/config";

import {
  submitBtn,
  basicTextField,
  selectTextField
} from "../../components/FormElements";

import { useStyles, types, poemTypes, kinds } from "./exports";

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
    <div></div>
  );

  const [word, setWord] = useState("");
  const [kind, setKind] = useState("rhymes");
  const [words, setWords] = useState(null);

  const [isSideView, setIsSideView] = useState(false);

  const handleTypeChange = event => {
    setType(event.target.value);

    types.map(({ value, formInput }) => {
      if (value === event.target.value) {
        setFormInput(formInput);
      }
    });
  };

  //fixme: future, handleChange see if you can make this into just one function
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

  /*
  const onSubmit = data => {
    setIsSnackbarOpen(true);
    console.log(data);
    console.log(JSON.stringify(data));
    console.log(data.body);
  };
  */

  const onSubmit = event => {
    console.log(event.title.value);
    setIsSnackbarOpen(true);
 
  };

  const onWordChange = event => {
    setWord(event.target.value);
  };

  const onSwitchView = event => {
    setIsSideView(!isSideView);
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

  const body = (
    <Grid container>
      <Grid item xs={12} className={!isSideView && (classes.bodyDiv) || isSideView && (classes.sideBodyDiv)}>
        <h1>Create</h1>
        <div className={!isSideView && (classes.formDiv) || isSideView && (classes.sideFormDiv)}>
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
        </div>
        <div className={!isSideView && (classes.wordLookupDiv) || isSideView && (classes.sideWordLookupDiv)}>
      
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

          <IconButton 
          onClick={onSwitchView}
          className={classes.switchViewBtn}>
            {!isSideView && (<ViewColumnRoundedIcon />) || (isSideView && (<ViewStreamRoundedIcon />))}
          </IconButton>

          {words != null && (
            <div className={classes.wordCardContainer}>
              {words.map(option => (
                <div className={(!isMobileView && classes.wordCard || (isMobileView && classes.mobileWordCard))}>
                  <span className={(!isMobileView && classes.word || (isMobileView && classes.mobileWord))}>{option[0]}</span>
                  <span className={(!isMobileView && classes.rating || (isMobileView && classes.mobileRating))}>{option[1]}</span>
                </div>
              ))}
            </div>
          )}
          </div>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
          Successfully published!
        </MuiAlert>
      </Snackbar>
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