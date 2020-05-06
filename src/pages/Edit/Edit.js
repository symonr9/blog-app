/***********************************************************************
 * File Name: Edit.js
 * Description: Edit page. This component has the form dynamically defined
 * based on the data type (poetry, prose, quotes). Similar to the Create page.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom"; 
import { useSelector } from "react-redux";

import { Button, Grow, Grid, TextField, Snackbar, CircularProgress, IconButton  } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import ViewColumnRoundedIcon from '@material-ui/icons/ViewColumnRounded';
import ViewStreamRoundedIcon from '@material-ui/icons/ViewStreamRounded';

import ReactTimeAgo from "react-time-ago";
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData, postData, putData } from "../../services/api";
import { useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import {
  textFieldStyle,
  submitBtn,
  basicTextField,
  editTextField,
  selectTextField
} from "../../components/FormElements";

import { useStyles, kinds } from "./exports";
/**********************************************************************/


/**********************************************************************
 * Function Name: Edit
 * Parameters: URL parameters include type and urlId. The URL route is 
 * /:type/:urlId/edit.
 * Description: Component for the Edit page.
 * Notes: None
 **********************************************************************/
function Edit() {  
  /* Authentication Handling ********************************************/
  const sessionUsername = useSelector(state => state.username);

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!sessionUsername;

  const history = useHistory();

  if(!isLoggedIn){
    history.push("/redirect");
  }
  /**********************************************************************/

  const { type, urlId } = useParams();

  const classes = useStyles();
  const common = useCommonStyles();

  //Data type for these hooks are arrays.
  //data can be poetry, quotes, or prose depending on the type.
  const [data, setData] = useState(null);

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
  const [_id, setId] = useState("");
  const [isPublic, setIsPublic] = useState(true);

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
  /******************************************************* */


/**********************************************************************
 * Function Name: fetchData
 * Parameters: isSubscribed variable ensures that the component isn't
 * loaded until after the fetch request is completed.
 * Description: Fetches the data of the item being looked at. 
 * Notes: None
 **********************************************************************/
  const fetchData = isSubscribed => {
    //GETs the data from the server. URI determined by url params.
    getData(getServerURL(type + "/" + urlId), response => {
      if (isSubscribed) {
        setData(response);
        setId(response._id);
        setIsPublic(response.isPublic);

        if(response.createdBy !== sessionUsername){
          history.push("/redirect");
        }

        //Get data and assign them to the appropriate forms.
        if(type === "poetry"){
          setPoemTitle(response.title);
          setPoemBody(response.body);
          setPoemType(response.type);
          setPoemNotes(response.notes);
        }
        else if(type === "quotes"){
          setQuoteText(response.text);
          setQuoteAuthor(response.author);
        }
        else if(type === "prose"){
          setProseTitle(response.title);
          setProseBody(response.body);
        }
      }
    });
  };

  //Run fetchData on the first render. When the second parameter is an 
  //empty array, the useEffect function will only be executed on page load.
  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && fetchData(isSubscribed);
    return () => (isSubscribed = false);
  }, []);

  /* Hooks and Handlers for Submit Form ****************** */
  const { handleSubmit } = useForm();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

 /**********************************************************************
 * Function Name: onSubmit
 * Parameters: None (uses hooks)
 * Description: Creates a put request with the forms as dynamically 
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
            "isPublic": isPublic,
            "createdBy": sessionUsername,
          };
          url = "poetry/edit/" + _id;

          break;
        case "quotes":
          data = {
            "text": quoteText,
            "author": quoteAuthor,
            "isPublic": isPublic,
            "createdBy": sessionUsername,
          }; 
          url = "quotes/edit/" + _id;
        
          break;
        case "prose":
          data = {
            "title": proseTitle,
            "body": proseBody,
            "isPublic": isPublic,
            "createdBy": sessionUsername,
          };
          url = "prose/edit/" + _id;

          break;
        default:
          console.log("Something went wrong..."); 
          return 0;
      }

      //Put Request to UPDATE on the server.
      putData(
        getServerURL(url),
        data,
        response => {
          console.log(response);
          setIsSnackbarOpen(true);
          history.push("/");
        }
      );
    }

  };

  /******************************************************* */

  //Dynamically determine the body content for the form.
  const bodyContent = (
    <div>
      {
      (data 
        && ( type === "poetry" && 
              (<div>
                {editTextField("poemTitle", data.title, "Title", handlePoemTitleChange)}
                {editTextField("poemBody", data.body, "Body", handlePoemBodyChange, 8)}
                {editTextField("poemType", data.type, "Type of your poem", handlePoemTypeChange)}
                {editTextField("poemNotes", data.notes, "Notes", handlePoemNotesChange, 2)}
                {submitBtn("Save")}
                <br/><br/>
                by {data.createdBy}
                <br/><br/>
                created <ReactTimeAgo date={data.createdAt} />
                <br/><br/><br/>
              </div>)
              ||
              type === "quotes" &&
              (<div>
                {editTextField("quoteText", data.text, "A quote to remember", handleQuoteTextChange, 3)}
                {editTextField("quoteAuthor", data.author, "Who said it?", handleQuoteAuthorChange)}
                {submitBtn("Save")}
                <br/><br/>
                by {data.createdBy}
                <br/><br/>
                created <ReactTimeAgo date={data.createdAt} />
                <br/><br/><br/>        
              </div>)
              ||
              type === "prose" && 
              (<div>
                {editTextField("proseTitle", data.title, "Title", handleProseTitleChange)}
                {editTextField("proseBody", data.body, "Body", handleProseBodyChange, 12)}
                {submitBtn("Save")}
                <br/><br/>
                by {data.createdBy}
                <br/><br/>
                created <ReactTimeAgo date={data.createdAt} />
                <br/><br/><br/>
              </div>)
              ||
              (<div>Sorry, this does not exist.</div>)
            )
      )
      }
      <br/>
    </div>
  );

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1 className={common.pageHeader}>Edit</h1>
        <div className={classes.editContainerDiv}>
          {(data && 
          <form onSubmit={handleSubmit(onSubmit)}>
            {bodyContent}
          </form>) ||
            (!data && (
              <div>
                <CircularProgress />
              </div>
            ))}
        </div>
        <div className={!isSideView && (classes.wordLookupDiv) || isSideView && (classes.sideWordLookupDiv)}>
          <hr/>
          {basicTextField("word", "Look a word up", handleWordChange)}
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
          <hr/>
        </div>
        <br/><br/><br/>
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

export default Edit;
