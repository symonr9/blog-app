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


  /* Hooks and Handlers for Side View ******************** */
  const [isSideView, setIsSideView] = useState(false);

  const handleSwitchView = event => {
    setIsSideView(!isSideView);
  };
  /******************************************************* */


  /* Hooks and Handlers for Word Finder Section ********** */
  const [word, setWord] = useState("");
  const [kind, setKind] = useState("rhymes");
  const [words, setWords] = useState(null);

  const handleWordChange = event => {
    setWord(event.target.value);
  };

  const handleKindChange = event => {
    setKind(event.target.value);
  };

  const handleWordLookup = () => {
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
  /******************************************************* */


  /* Hooks and Handlers For Forms ************************ */
  const [type, setType] = useState("");
  const [formInput, setFormInput] = useState(
    <div></div>
  );
  
  const handleTypeChange = event => {
    setType(event.target.value);

    types.map(({ value, formInput }) => {
      if (value === event.target.value) {
        setFormInput(formInput);
      }
    });
  };

  const [poemTitle, setPoemTitle] = useState("");
  const [poemBody, setPoemBody] = useState("");
  const [poemType, setPoemType] = useState("");
  const [poemNotes, setPoemNotes] = useState("");

  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");

  const [proseTitle, setProseTitle] = useState("");
  const [proseBody, setProseBody] = useState("");

  const handlePoemTitleChange = event => {
    setPoemTitle(event.target.value);
  };

  const handlePoemBodyChange = event => {
    setPoemBody(event.target.value);
  };

  const handlePoemTypeChange = event => {
    setPoemType(event.target.value);
  };

  const handlePoemNotesChange = event => {
    setPoemNotes(event.target.value);
  };

  const handleQuoteTextChange = event => {
    setQuoteText(event.target.value);
  };

  const handleQuoteAuthorChange = event => {
    setQuoteAuthor(event.target.value);
  };

  const handleProseTitleChange = event => {
    setProseTitle(event.target.value);
  };

  const handleProseBodyChange = event => {
    setProseBody(event.target.value);
  };

  const types = [
    {
      value: "poetry",
      label: "compose a poem",
      formInput: (
        <div>
          {basicTextField("poemTitle", "Title", handlePoemTitleChange)}
          {basicTextField("poemBody", "Body", handlePoemBodyChange, 8)}
          {basicTextField("poemType", "Type of your poem", handlePoemTypeChange)}
          {basicTextField("poemNotes", "Notes", handlePoemNotesChange, 2)}
          {submitBtn("Publish")}
        </div>
      )
    },
    {
      value: "quotes",
      label: "remember a quote",
      formInput: (
        <div>
          {basicTextField("quoteText", "A quote to remember", handleQuoteTextChange, 3)}
          {basicTextField("quoteAuthor", "Who said it?", handleQuoteAuthorChange)}
          {submitBtn("Publish")}
        </div>
      )
    },
    {
      value: "prose",
      label: "write some prose",
      formInput: (
        <div>
          {basicTextField("proseTitle", "Title", handleProseTitleChange)}
          {basicTextField("proseBody", "Body", handleProseBodyChange, 12)}
          {submitBtn("Publish")}
        </div>
      )
    },
  ];

  /******************************************************* */

  /* Hooks and Handlers for Submit Form ****************** */
  const { handleSubmit, register, watch, errors } = useForm();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const onSubmit = event => {
    let data = {};
    let url = "";

    switch(type){
      case "poetry":
        data = {
          "title": poemTitle,
          "body": poemBody, 
          "type": poemType,
          "notes": poemNotes
        };
        url = "poems/create";

        break;
      case "quotes":
        data = {
          "text": quoteText,
          "author": quoteAuthor
        }; 
        url = "quotes/create";
      
        break;
      case "prose":
        data = {
          "title": proseTitle,
          "body": proseBody
        };
        url = "prose/create";

        break;
      default:
        console.log("Something went wrong..."); 
        return 0;
    }

    postData(
      getServerURL(url),
      data,
      response => {
        console.log(response);
      }
    );

    setIsSnackbarOpen(true);
  };

  /******************************************************* */


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
            onChange={handleWordChange}
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
            onClick={handleWordLookup}
            className={classes.spacing}>
            Look
          </Button>

          <IconButton 
          onClick={handleSwitchView}
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