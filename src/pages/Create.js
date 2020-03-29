import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { getData, postData } from "../services/api";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";

import { Button, Grow, Grid, TextField, Paper, Badge } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import useCommonStyles from "../assets/common";

import {
  submitBtn,
  basicTextField,
  selectTextField
} from "../components/FormElements";

const useStyles = makeStyles({
  word: {
    fontSize: "1.5em"
  },
  rating: {
    fontSize: "0.75em",
    float: "right",
    marginTop: "0.50em !important",
    marginRight: "0.5em",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    paddingTop: "0.25em",
    paddingBottom: "0.25em",
    borderRadius: "100px",
    backgroundColor: "lightblue"
  },
  wordCardContainer: {
    overflowY: "scroll",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginBottom: '1em',
    borderRadius: '10px',
    boxShadow: "5px 5px #bebebe"
  },
  wordCard: {
    width: '12em',
    marginBottom: '0.25em',
    marginRight: '0.25em',
    "& :hover": {
      backgroundColor: 'lightgray',
      cursor: 'pointer'
    }
  },
  mobileWord: {
    fontSize: "1em"
  },
  mobileRating: {
    fontSize: "0.5em",
    float: "right",
    marginTop: "0.50em !important",
    marginRight: "0.5em",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    paddingTop: "0.25em",
    paddingBottom: "0.25em",
    borderRadius: "100px",
    backgroundColor: "lightblue"
  },
  mobileWordCardContainer: {
    overflowY: "scroll",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    marginBottom: '1em',
    borderRadius: '10px',
    boxShadow: "5px 5px #bebebe"
  },
  mobileWordCard: {
    width: '8em',
    marginBottom: '0.25em',
    marginRight: '0.25em',
    "& :hover": {
      backgroundColor: 'lightgray',
      cursor: 'pointer'
    }
  },
  spacing: {
    marginTop: '0.75em',
    marginBottom: '0.75em'
  },
});

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

const kinds = [
  {
    value: "synonyms",
    label: "Synonyms"
  },
  {
    value: "antonyms",
    label: "Antonyms"
  },
  {
    value: "narrower",
    label: "Narrower"
  },
  {
    value: "broader",
    label: "Broader"
  },
  {
    value: "rhymes",
    label: "Rhymes"
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

  const onSubmit = data => {
    console.log(data);
  };

  const onWordChange = event => {
    setWord(event.target.value);
  };

  const onWordLookup = () => {
    var data = { word: word, kind: kind };

    postData("http://localhost:2020/words", data, response => {
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
