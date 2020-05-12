/***********************************************************************
 * File Name: exports.js
 * Description: Has exports for accompanying component file.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";

import { colors } from "../../assets/common";


export const useStyles = makeStyles({
  wordLookupDiv: {
    
  },
  word: {
    fontSize: "1.25em"
  },
  wordCardContainer: {
    overflowY: "scroll",
    height: "30em",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    flexFlow: 'space-evenly',
    marginBottom: "1em",
    borderRadius: "10px",
    backgroundColor: 'transparent'
  },
  wordCard: {
    backgroundColor: colors[3],
    color: colors[4],
    padding: '1em',
    border: '2px solid ' + colors[4],
    borderRadius: '10px',
    boxShadow: '5px 5px 5px 5px ' + colors[4],
  },
  mobileWord: {
    fontSize: "1em"
  },
  spacing: {
    marginTop: "0.75em",
    marginBottom: "0.75em"
  },
  switchViewBtn: {
    backgroundColor: colors[2],
    color: colors[4],
    borderRadius: '5em',
    padding: '0.4em',
    cursor: 'pointer',
    "& :hover": {
      color: colors[1]
    }
  },
  wordLookupDiv: {
    marginBottom: '5em'
  },
  sideWordLookupDiv: {
    float: 'left',
    display: 'inline-block',
    width: '36vw',
    marginBottom: '5em'
  },
  formDiv: {
  },
  sideFormDiv: {
    float: 'left',
    display: 'inline-block',
    width: '40vw',
    marginRight: '2em',
  },
  bodyDiv: {
    marginTop: '3em'
  },
  sideBodyDiv: {
    marginTop: '3em',
  }
});
