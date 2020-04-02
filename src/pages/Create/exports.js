import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

import {
  submitBtn,
  basicTextField,
  selectTextField
} from "../../components/FormElements";

export const useStyles = makeStyles({
  wordLookupDiv: {
    
  },
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
    marginBottom: "1em",
    borderRadius: "10px",
    boxShadow: "5px 5px #bebebe"
  },
  wordCard: {
    width: "12em",
    marginBottom: "0.25em",
    marginRight: "0.25em",
    "& :hover": {
      backgroundColor: "lightgray",
      cursor: "pointer"
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
    marginBottom: "1em",
    borderRadius: "10px",
    boxShadow: "5px 5px #bebebe"
  },
  mobileWordCard: {
    width: "8em",
    marginBottom: "0.25em",
    marginRight: "0.25em",
    "& :hover": {
      backgroundColor: "lightgray",
      cursor: "pointer"
    }
  },
  spacing: {
    marginTop: "0.75em",
    marginBottom: "0.75em"
  },
  switchViewBtn: {

  },
  wordLookupDiv: {
  },
  sideWordLookupDiv: {
    float: 'left',
    display: 'inline-block',
    width: '42vw',
  },
  formDiv: {
  },
  sideFormDiv: {
    float: 'left',
    display: 'inline-block',
    width: '42vw',
    marginRight: '2em',
  },
  bodyDiv: {
    marginTop: '3em'
  },
  sideBodyDiv: {
    marginTop: '3em',
  }
});

export const types = [
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

export const poemTypes = [
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

export const kinds = [
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
