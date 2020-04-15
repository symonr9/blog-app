/***********************************************************************
 * File Name: Create.js
 * Description: Create page. The ability to create poetry, prose, and 
 * quotes is here. A word-finder widget is also included in order to 
 * allow the user to search for rhymes, synonyms, and more.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom"; 
import { useSelector } from "react-redux";

import MUIRichTextEditor from "mui-rte";

import { Button, Grow, Grid, TextField, Paper, Snackbar, IconButton  } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import ViewColumnRoundedIcon from '@material-ui/icons/ViewColumnRounded';
import ViewStreamRoundedIcon from '@material-ui/icons/ViewStreamRounded';

/**********************************************************************/

/* Project Imports ****************************************************/
import { postData } from "../../services/api";
import { useStyles, kinds } from "./exports";
import { colors, useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import {
  submitBtn,
  basicTextField,
  selectTextField
} from "../../components/FormElements";
/**********************************************************************/



/**********************************************************************
 * Function Name: Create
 * Parameters: None
 * Description: Component for the Create page.
 * Notes: None
 **********************************************************************/
function Create() {
  /* Authentication Handling ********************************************/
  const sessionUsername = useSelector(state => state.username);

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!sessionUsername;

  const history = useHistory();

  if(!isLoggedIn){
    history.push("/redirect");
  }
  /**********************************************************************/

  const classes = useStyles();
  const common = useCommonStyles();

  /* Mobile View Handler ************************************************/
  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );

  //Adds a listener to re-render the component when the window width changes.
  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
  }, []);
  /**********************************************************************/


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

  /**********************************************************************
   * Function Name: handleWordLookup
   * Parameters: Uses the "word" and "kind" hooks.
   * Description: Component for the entire application.
   * Notes: None
   **********************************************************************/
  const handleWordLookup = () => {
    var data = { word: word, kind: kind };

    //Execute API request to look for words.
    postData(getServerURL("words"), data, response => {
      const { data } = response;
      let temp = [];

      switch(kinds){
        case "definitions":
          data.definitions.forEach(item => {
            temp.push(item);
          });
          break;
        case "examples":
          data.examples.forEach(item => {
            temp.push(item);
          });
          break;
        case "synonyms":
          data.synonyms.forEach(item => {
            temp.push(item);
          });
          break;
        case "antonyms":
          data.antonyms.forEach(item => {
            temp.push(item);
          });
          break;
        case "pronunciation":
          data.pronunciation.forEach(item => {
            temp.push(item);
          });
          break;
        case "rhymes":
          data.rhymes.forEach(item => {
            temp.push(item);
          });
          break;
        default: 
          break;
      }

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

  //Defines the options for the dropdown and the form that is dynamically rendered.
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
  const { handleSubmit } = useForm();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const clearForm = () => {
    document.getElementById("createForm").reset();
    
    setPoemTitle("");
    setPoemBody("");
    setPoemType("");
    setPoemNotes("");
    
    setQuoteText("");
    setQuoteAuthor("");

    setProseTitle("");
    setProseBody("");
  };

 /**********************************************************************
 * Function Name: onSubmit
 * Parameters: None (uses hooks)
 * Description: Creates a post request with the forms as dynamically 
 * defined based on the type of data being submitted.
 * Notes: None
 **********************************************************************/
  const onSubmit = () => {
    let data = {};
    let url = "";

    if(isLoggedIn){
      //type is defined based on the initial Select input value.
      switch(type){
        case "poetry":
          data = {
            "title": poemTitle,
            "body": poemBody, 
            "type": poemType,
            "notes": poemNotes,
            "createdBy": sessionUsername
          };
          url = "poetry/create";

          break;
        case "quotes":
          data = {
            "text": quoteText,
            "author": quoteAuthor,
            "createdBy": sessionUsername
          }; 
          url = "quotes/create";
        
          break;
        case "prose":
          data = {
            "title": proseTitle,
            "body": proseBody,
            "createdBy": sessionUsername
          };
          url = "prose/create";

          break;
        default:
          console.log("Something went wrong..."); 
          return 0;
      }

      //Post Request to CREATE on the server.
      postData(
        getServerURL(url),
        data,
        response => {
          console.log(response);
          clearForm();
          setIsSnackbarOpen(true);
        }
      );
    }
    
  };
  /******************************************************* */


  //Define the body.
  const body = (
    <Grid container>
      <Grid item xs={12} className={!isSideView && (classes.bodyDiv) || isSideView && (classes.sideBodyDiv)}>
        <h1>Create</h1>
        <div className={!isSideView && (classes.formDiv) || isSideView && (classes.sideFormDiv)}>
        <form id="createForm" onSubmit={handleSubmit(onSubmit)}>
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
            kinds))
            ||
            (isMobileView && (
              selectTextField(
                "kind",
                "What to search?",
                kind,
                handleKindChange,
                kinds)
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