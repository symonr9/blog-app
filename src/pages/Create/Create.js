/***********************************************************************
 * File Name: Create.js
 * Description: Create page. The ability to create poetry, prose, and 
 * quotes is here. A word-finder widget is also included in order to 
 * allow the user to search for rhymes, synonyms, and more.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


/* Library Imports ****************************************************/
import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom"; 
import { useSelector } from "react-redux";

import MUIRichTextEditor from "mui-rte";

import { useDropzone } from 'react-dropzone';

import { Button, Grow, Grid, TextField, Paper, Snackbar, IconButton  } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import ViewColumnRoundedIcon from '@material-ui/icons/ViewColumnRounded';
import ViewStreamRoundedIcon from '@material-ui/icons/ViewStreamRounded';

/**********************************************************************/

/* Project Imports ****************************************************/
import { postData } from "../../services/api";
import { useStyles } from "./exports";
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
  const [kind, setKind] = useState("");
  const [words, setWords] = useState(null);
  let wordKey = 0;

  const handleWordChange = event => {
    setWord(event.target.value);
  };

  const handleKindChange = event => {
    let newKind = event.target.value;

    setWords(null);
    setKind(newKind);

    //Perform word lookup.
    handleWordLookup(word, newKind);
  };


  //Options for wordLookup selection
  const kinds = [
    {
      value: "definitions",
      label: "Definitions"
    },
    {
      value: "examples",
      label: "Examples"
    },
    {
      value: "synonyms",
      label: "Synonyms"
    },
    {
      value: "antonyms",
      label: "Antonyms"
    },
    {
      value: "pronunciation",
      label: "Pronunciation"
    },
    {
      value: "rhymes",
      label: "Rhymes"
    }
  ];
  
  /**********************************************************************
   * Function Name: handleWordLookup
   * Parameters: Uses the "word" and "kind" hooks, selected from user 
   * input. 
   * Description: Uses WordsAPI on RapidAPI to retrieve different data
   * for a given word. Because the format is different, the data needs
   * to be parsed depending on the kind of lookup being performed. 
   * Notes: Definitions and Pronunciations have arrays of objects and 
   * require different rendering and handling than the other lookup 
   * kinds.
   **********************************************************************/
  const handleWordLookup = (word, kind) => {
    var data = { word: word, kind: kind };

    //Execute API request to look for words.
    postData(getServerURL("words"), data, response => {
      let temp = [];

      switch(kind){
        case "definitions":
          //{word: ---, definitions: [{"definition": "xxx", "partOfSpeech": "xxx"}, {"definition": "xxx", "partOfSpeech": "xxx"}]}
          response.definitions.forEach(item => {
            let itemArr = [];

            itemArr.push(item.definition);
            itemArr.push(item.partOfSpeech);

            temp.push(itemArr);
          });
          break;
        case "examples": //works
          //{word: ---, examples: ["xxx", "xxx", "xxx"]}
          response.examples.forEach(item => {
            temp.push(item);
          });
          break;
        case "synonyms": //works
          //{word: ---, synonyms: ["xxx", "xxx", "xxx"]}
          response.synonyms.forEach(item => {
            temp.push(item);
          });
          break;
        case "antonyms": //works
          //{word: ---, antonyms: ["xxx", "xxx", "xxx"]}
          response.antonyms.forEach(item => {
            temp.push(item);
          });
          break;
        case "pronunciation":
          //{word: ---, pronunciation: {"all": "xxx", "noun": "xxx", "verb": "xxx"}}
          let itemArr = [];
          let item = response.pronunciation;

          itemArr.push(item.all);

          if('noun' in item){
            itemArr.push(item.noun);
          }
          if('verb' in item){
            itemArr.push(item.verb);
          }
          
          temp.push(itemArr);
          break;
        case "rhymes": //works
          //{word: ---, rhymes: {all: ["xxx", "xxx", "xxx"]}}
          response.rhymes.all.forEach(item => {
            temp.push(item);
          });
          break;
        default: 
          break;
      }

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

  const [docTitle, setDocTitle] = useState("");
  const [docDescription, setDocDescription] = useState("");
  const [docDiv, setDocDiv] = useState(<div></div>);

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

  const handleDocTitleChange = event => {
    setDocTitle(event.target.value);
  };

  const handleDocDescriptionChange = event => {
    setDocDescription(event.target.value);
  };

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

  useEffect(() => {
    setDocDiv([
    <span>{acceptedFiles[0] && acceptedFiles[0].path}</span>
    ])
  }, [acceptedFiles]);

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
            "createdBy": sessionUsername,
            "isPublic": true
          };
          url = "poetry/create";

          break;
        case "quotes":
          data = {
            "text": quoteText,
            "author": quoteAuthor,
            "createdBy": sessionUsername,
            "isPublic": true
          }; 
          url = "quotes/create";
        
          break;
        case "prose":
          data = {
            "title": proseTitle,
            "body": proseBody,
            "createdBy": sessionUsername,
            "isPublic": true
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

          <IconButton 
          onClick={handleSwitchView}
          className={classes.switchViewBtn}>
            {!isSideView && (<ViewColumnRoundedIcon />) || (isSideView && (<ViewStreamRoundedIcon />))}
          </IconButton>

          {words && 
          (<div className={classes.wordCardContainer}>
            {words && words.map(option => (
              <div className={(!isMobileView && classes.wordCard || (isMobileView && classes.mobileWordCard))} key={wordKey++}>
                {/* [0] --> definition, [1] --> part of speech */}
                {kind === "definitions" && (
                  <span>
                    <span className={(!isMobileView && classes.word || (isMobileView && classes.mobileWord))}>Definition {wordKey} ({option[1]}): </span>
                    <span className={(!isMobileView && classes.word || (isMobileView && classes.mobileWord))}>{option[0]}</span>
                  </span>
                )}
                {/* [0] --> all, [1] --> noun, [2] --> verb */}
                {kind === "pronunciation" && (
                  <span>
                    <span className={(!isMobileView && classes.word || (isMobileView && classes.mobileWord))}>{option[0]}</span>
                  </span>
                )}
                {(kind === "rhymes" || kind === "synonyms" || kind === "antonyms" || kind === "examples") && (
                  <span className={(!isMobileView && classes.word || (isMobileView && classes.mobileWord))}>{option}</span>
                )}
              </div>
            ))
            }
          </div>)}
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
      {<div className={!isMobileView ? common.bodyDiv : common.mobileBodyDiv}>{body}</div>}
    </Grow>
  );
}

export default Create;