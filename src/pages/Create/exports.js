/***********************************************************************
 * File Name: exports.js
 * Description: Has exports for accompanying component file.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  wordLookupDiv: {
    
  },
  word: {
    fontSize: "1.25em"
  },
  wordCardContainer: {
    overflowY: "scroll",
    height: "15em",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginBottom: "1em",
    borderRadius: "10px",
    backgroundColor: 'transparent'
  },
  wordCard: {
    width: "12em",
    marginBottom: "0.25em",
    marginRight: "0.25em",
    border: '2px solid #bebebe',
    borderRadius: '5px',
  },
  mobileWord: {
    fontSize: "1.25em"
  },
  mobileWordCard: {
    width: '15em',
    marginBottom: "0.25em",
    marginRight: "0.25em",
    border: '2px solid #bebebe',
    borderRadius: '5px',
  },
  spacing: {
    marginTop: "0.75em",
    marginBottom: "0.75em"
  },
  switchViewBtn: {

  },
  wordLookupDiv: {
    marginBottom: '5em'
  },
  sideWordLookupDiv: {
    float: 'left',
    display: 'inline-block',
    width: '42vw',
    marginBottom: '5em'
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
