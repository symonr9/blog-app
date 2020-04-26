/***********************************************************************
 * File Name: exports.js
 * Description: Has exports for accompanying component file.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";

import { colors } from "../../assets/common";




export const useStyles = makeStyles({
    singleContainerDiv: {
        whiteSpace: 'pre-wrap',
        "& a": {
            textDecoration: 'none',
            color: 'black'
        }
    },
    bgDiv: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        borderRadius: '1em',
        textAlign: 'center', 
        margin: '2em',
        
        animationName: '$title-animation',
        animationDuration: '1.5s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    },
    '@keyframes title-animation': {
        '0%': {
            backgroundColor: '#d8e9f4',
            border: 'solid 0.005em #333745',
            fontSize: '0.4em',
            padding: '0.05em'
        }, 
        '50%': {
            backgroundColor: '#FFEC60', 
            border: 'solid 0.1em #333745',
            fontSize: '2em',
            padding: '0.25em'
        },
        '100%': {
            backgroundColor: '#F7F5E6', 
            border: 'solid 0.1em #333745',
            fontSize: '4em',
            padding: '0.5em',
        }
    },
    subheader: { 
        display: 'flex',
        flexDirection: 'column',
    },
    author: {
        textAlign: 'center',
        borderRadius: '0.5em',
        marginLeft: '10em',
        marginRight: '10em',
        marginBottom: '1em',
    
        animationName: '$notes-animation',
        animationDuration: '0.75s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    }, 
    notes: {
        textAlign: 'center',
        borderRadius: '0.5em',
        marginRight: '10em',
        marginLeft: '10em',
        marginBottom: '5em',
        
        animationName: '$notes-animation',
        animationDuration: '0.75s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    }, 
    '@keyframes notes-animation': {
        '0%': {
            fontSize: '0.5em',
            padding: '0.25em',
            backgroundColor: '#FFEC60'
        },
        '100%': {
            fontSize: '1em',
            padding: '1em',
            border: 'solid 0.1em #333745',
            backgroundColor: '#F7F5E6',
        }
    }, 
    body: {
        textAlign: 'center',
        borderRadius: '1em',
        
        animationName: '$body-animation',
        animationDuration: '1.25s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    },
    '@keyframes body-animation': {
        '0%': {
            fontSize: '0.25em',
            border: 'solid 0.025em #3E92CC',
            backgroundColor: '#FFEC60',
            margin: '2em',
            marginTop: '8em'
        },
        '50%': {
            fontSize: '1em',
            padding: '6em',
            margin: '6em',
            marginLeft: '8em',
            marginRight: '8em',
            border: 'solid 0.1em #F7F5E6',
            backgroundColor: '#3E92CC'
        },
        '100%': {
            fontSize: '1.25em',
            padding: '4em',
            margin: '4em',
            border: 'solid 0.25em #3E92CC',
            backgroundColor: '#ebe6bf',
        }
    }
});