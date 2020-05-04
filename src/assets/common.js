/***********************************************************************
 * File Name: common.js
 * Description: Common stylings used throughout the entire application.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";
import WebFont from 'webfontloader';

/* Color Schemes ****************************************************/
/* [white, primary, secondary, base, font, accent] 
 *
 * primary: light, will have the header
 * secondary: dark or matching
 * base: should be light
 * font: font color, should be dark. includes navbar buttons
 * accent: headers and titles, should be dark
 * 
 * bg1 = primary 25%, base 75%
 * bg2 = primary 15%, secondary 15%, base 70%
 * bg3 = base 100%
 */


//celestial blue, maize, old lace, onyx, charleston green
export const colors = ["white", "#3E92CC", "#FFEC60", "#F7F5E6", "#333745", "#232630"];

//stil de graine yellow, jet, beige, cafe noir, smokey black
//export const colors = ["white", "#F5CB5C", "#333533", "#F5F7DC", "#4F3421", "#0D0A0B"];

//maximum blue green, wild orchard, beige, maastricht blue 
//export const colors = ["white", "#2EC4B6", "#CE7DA5", "#F5F7DC", "#493657", "#493657"];

/**********************************************************************/

//0 is body, 1 is header, 2 is button
export const fonts = ["Cabin", "Julius Sans One", "Cabin Condensed"];
//export const fonts = ["Cutive Mono", "Ramabhadra", "Ramabhadra"];
//export const fonts = ["V323", "Ultra", "Bebas Neue"];
//export const fonts = ["Cutive Mono", "Permanent Marker", "Roboto"];

//Loads Google Fonts in a safe and efficent way.
WebFont.load({
  google: {
    families: [fonts[0], fonts[1], fonts[2]]
  }
});



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
    marginBottom: '5em'
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
    width: '90%',
    marginLeft: '1em',
    marginRight: '1em',
    marginTop: '1em',
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
    fontFamily: fonts[1],
    fontSize: '1.3em',
    display: 'block',
    fontWeight: 'bold',
    color: colors[5] + " !important",
    "& :hover": {
      color: colors[4] + " !important"
    }
  },
  body: {
    fontFamily: fonts[0],
    fontSize: '1em',
    display: 'block',
    marginTop: '0.75em',
    marginBottom: '0.75em',
    whiteSpace: 'pre-wrap',
  },
  createdBy: {
    fontFamily: fonts[0],
    fontSize: '0.8em',
    display: 'block',
    color: colors[5] + " !important",

  },
  smallText: {
    fontFamily: fonts[1],
    fontSize: '0.75em',
    display: 'block'
  },
  createdAt: {
    fontFamily: fonts[1],
    fontSize: '0.75em',
    display: 'block',
    position: 'relative',
    bottom: '0'
  },
  altFont: {
    fontFamily: fonts[0] + ' !important'
  },
  paperAnimation: {
    textAlign: 'center',
    borderRadius: '1em',
    
    animationName: '$paper-animation',
    animationDuration: '1.75s',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-in-out'
  },
  mobilePaperAnimation: {
    textAlign: 'center',
    borderRadius: '1em',
    
    animationName: '$mobile-paper-animation',
    animationDuration: '1.5s',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-in-out'
  },
  '@keyframes paper-animation': {
    '0%': {
        flex: '100%',
        fontSize: '2em',
        border: 'solid 0.025em #3E92CC',
        backgroundColor: colors[2],
    },  
    '70%': {
        flex: '10%',
        fontSize: '0.75em',
        padding: '2em',
        border: 'solid 0.75em ' + colors[2],
        backgroundColor: colors[1]
    },
    '100%': {
        flex: '30%',
        fontSize: '1em',
        padding: '10px',
        backgroundColor: colors[3],
    }
},
'@keyframes mobile-paper-animation': {
    '0%': {
      flex: '100%',
      fontSize: '2em',
      border: 'solid 0.025em #3E92CC',
      backgroundColor: colors[2],
  },  
  '70%': {
      fontSize: '0.75em',
      padding: '3em',
      border: 'solid 0.75em ' + colors[2],
      backgroundColor: colors[1]
  },
  '100%': {
      width: '100px',
      fontSize: '1em',
      padding: '10px',
      backgroundColor: colors[3],
  }
  },
  formAnimation: {
    borderRadius: '1em',
    
    animationName: '$form-animation',
    animationDuration: '1.25s',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-in-out'
  },
  '@keyframes form-animation': {
    '0%': {
        border: 'solid 1em ' + colors[1],
    },  
    '40%': {
        margin: '4em',
        border: 'solid 1em ' + colors[2],
    },
    '100%': {
    }
  },
});