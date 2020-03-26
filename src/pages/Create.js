import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { getData, postData } from "../services/api";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";
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
    marginBottom: "1em"
  },
  submitBtnDiv: {
    marginTop: "2em",
    marginBottom: "2em"
  },
  formInput: {
    marginTop: "0.5em"
  }
});

const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: "0.5em",
        width: "100%",
        border: "1px solid lightgray",
        borderRadius: "5px"
      },
      editor: {
        height: "15em",
        maxHeight: "100vh",
        overflow: "auto",
        marginLeft: "1em"
      }
    }
  }
});

const poemTypes = [
  {
    value: "prose",
    label: "Prose"
  },
  {
    value: "iambic-pentameter",
    label: "Iambic Pentameter"
  },
  {
    value: "sonnet",
    label: "Sonnet"
  },
  {
    value: "custom",
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
  const [poemType, setPoemType] = useState("");
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

  const handlePoemTypeChange = event => {
    setPoemType(event.target.value);
  };

  let rtePoemInput = useRef(null);

  const handleRTEClick = event => {
    rtePoemInput.current.focus();
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

  const richTextEditor = (id, name, numOfLines = 1) => {
    return <div>sds</div>;
  };

  const basicTextField = (name, label, numOfLines = 1) => {
    return (
      <TextField
        name={name}
        label={label}
        placeholder="Start writing..."
        variant="outlined"
        multiline={!(numOfLines == 1)}
        rows={numOfLines}
        fullWidth
        className={classes.formInput}
      ></TextField>
    );
  };

  const selectTextField = (name, label, value, onChangeFun, options) => {
    return (
      <TextField
        name={name}
        label={label}
        placeholder="Start writing..."
        variant="outlined"
        value={value}
        select
        onChange={onChangeFun}
        fullWidth
        className={classes.formInput}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const types = [
    {
      value: "poetry",
      label: "compose a poem",
      formInput: (
        <div className={classes.formDiv}>
          {basicTextField("title", "Title of your masterpiece")}

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

          {selectTextField(
            "poemType",
            "Type of your poem",
            poemType,
            handlePoemTypeChange,
            poemTypes
          )}
          {basicTextField("notes", "Notes of your poem", 2)}

          {submitBtn}
        </div>
      )
    },
    {
      value: "quotes",
      label: "remember a quote",
      formInput: <div>
        {basicTextField("text", "A quote to remember", 3)}
        {basicTextField("author", "Who said it?")}
        {submitBtn}
      </div>
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
