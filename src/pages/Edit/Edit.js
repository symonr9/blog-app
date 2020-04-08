
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { getData, postData, putData } from "../../services/api";

import ViewColumnRoundedIcon from '@material-ui/icons/ViewColumnRounded';
import ViewStreamRoundedIcon from '@material-ui/icons/ViewStreamRounded';

import { Button, Grow, Grid, TextField, Paper, Snackbar, CircularProgress, IconButton  } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import ReactTimeAgo from "react-time-ago";

import { colors, useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import { useStyles, kinds } from "./exports";

import {
  submitBtn,
  basicTextField,
  editTextField,
  selectTextField
} from "../../components/FormElements";


function Edit() {  
  const { type, urlId } = useParams();

  const classes = useStyles();
  const common = useCommonStyles();

  const [data, setData] = useState(null);

  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );

  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
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

  let dataType = type;
    
  //fixme, fix this nomenclature
  if(type == "poetry"){
    dataType = "poems";
  }

  //prose, quotes, poems
  const fetchData = isSubscribed => {
    getData(getServerURL(dataType + "/" + urlId), response => {
      if (isSubscribed) {
        setData(response);
        setId(response._id);
        setIsPublic(response.isPublic);

        if(dataType == "poems"){
          setPoemTitle(response.title);
          setPoemBody(response.body);
          setPoemType(response.type);
          setPoemNotes(response.notes);
        }
        else if(dataType == "quotes"){
          setQuoteText(response.text);
          setQuoteAuthor(response.author);
        }
        else if(dataType == "prose"){
          setProseTitle(response.title);
          setProseBody(response.body);
        }
      }
    });
  };

  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && fetchData(isSubscribed);
    return () => (isSubscribed = false);
  }, []);

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
          "notes": poemNotes,
          "isPublic": isPublic,
        };
        url = "poems/edit/" + _id;

        break;
      case "quotes":
        data = {
          "text": quoteText,
          "author": quoteAuthor,
          "isPublic": isPublic,
        }; 
        url = "quotes/edit/" + _id;
      
        break;
      case "prose":
        data = {
          "title": proseTitle,
          "body": proseBody,
          "isPublic": isPublic,
        };
        url = "prose/edit/" + _id;

        break;
      default:
        console.log("Something went wrong..."); 
        return 0;
    }

    putData(
      getServerURL(url),
      data,
      response => {
        console.log(response);
      }
    );

    setIsSnackbarOpen(true);
  };

  /******************************************************* */


  const bodyContent = (
    <div>
      {
      (data 
        && ( dataType == "poems" && 
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
              dataType == "quotes" &&
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
              dataType == "prose" && 
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
        <h1>Edit</h1>
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

export default Edit;
