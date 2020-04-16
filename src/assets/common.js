/***********************************************************************
 * File Name: common.js
 * Description: Common stylings used throughout the entire application.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";

/* Color Schemes ****************************************************/
/* [white, primary, secondary, base, font] 
 *
 * primary: light, will have the header
 * secondary: dark or matching
 * base: should be light
 * font: font color, should be dark
 * 
 * bg1 = primary 25%, base 75%
 * bg2 = primary 15%, secondary 15%, base 70%
 * bg3 = base 100%
 */


//stil de graine yellow, jet, beige, raisin black
export const colors = ["white", "#F5CB5C", "#333533", "#F5F7DC", "#242423"];

//maximum blue green, wild orchard, beige, maastricht blue 
//export const colors = ["white", "#2EC4B6", "#CE7DA5", "#F5F7DC", "#493657"];

//cerulean frost, 
//export const colors = ["white", "#6d9bc3", "#5d3f6a", "#ffff99", "black"];

//blue and vanilla
//export const colors = ["white", "#8eb5eb", "#1d56a5", "#ffff99", "black"];

//blue, yellow, vanilla
//export const colors = ["white", "#246bce", "#ffff31", "#ffff99", "black"];

//blueeee
//export const colors = ["white", "#246bce", "#ffffff", "#a6e7ff", "black"];

//milky chocolate
//export const colors = ["white", "#7ba9c3", "#84563c", "#fdfff5", "black"];

//pink, black, mint
//export const colors = ["white", "#de5d83", "#010b13", "#f5fffa", "black"];

//penguin, white, blue, black
//export const colors = ["white", "#fdfff5", "#318ce7", "white", "#080808"];
/**********************************************************************/


export const useCommonStyles = makeStyles({
  /* Component Styles  ************************************************/
  bodyDiv: {
    height: "100%",
    width: "90vw",
    marginLeft: "1em",
    marginRight: "1em",
  },
  mobileBodyDiv: {
    height: "100%",
    width: "90vw",
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "1em"
  },
  blankDiv: {
    marginTop: "20em"
  },
  formDiv: {
    "& > *": {
      marginTop: "0.5em"
    }
  },
  spacingTop: {
    marginBottom: '4em'
  },
  /* Item Card Styles  ************************************************/
  containerDiv: {
    display: 'flex',
    flexFlow: "row wrap",
    marginBottom: '5em'
  },
  itemDiv: {
    flex: '30%',
    padding: '10px',
    backgroundColor: 'transparent',
    width: '100px',
    marginRight: '1em',
    marginBottom: '1em',
    "& a": {
      textDecoration: 'none',
      color: colors[4],
      "& :hover": {
        color: colors[2]
      }
    }
  },
  mobileItemDiv: {
    flex: '100%',
    padding: '10px',
    backgroundColor: 'transparent',
    width: '90%',
    marginRight: '1em',
    marginBottom: '1em',
    "& a": {
      textDecoration: 'none',
      color: colors[4],
      "& :hover": {
        color: colors[2],
      }
    },
  },
  title: {
    fontSize: '1.3em',
    display: 'block',
    fontWeight: 'bold',
  },
  body: {
    fontSize: '1em',
    display: 'block',
    marginTop: '0.75em',
    marginBottom: '0.75em',
    whiteSpace: 'pre-wrap',
  },
  createdBy: {
    fontSize: '0.8em',
    display: 'block'
  },
  smallText: {
    fontSize: '0.75em',
    display: 'block'
  },
  createdAt: {
    fontSize: '0.75em',
    display: 'block',
    position: 'relative',
    bottom: '0'
  },
  /* Sort and Filter Styles  ************************************************/
  sortDiv: {
  },
  sortWidget: {
    cursor: 'pointer',
    color: colors[4],
    fontSize: '4em',
    marginLeft: '0.5em',
  },
  sortChip: {
    fontSize: '40em'
  },
  sortFilterBarDiv: {
   display: 'flex',
   marginBottom: '2em' 
  }
  
});