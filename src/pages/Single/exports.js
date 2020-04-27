/***********************************************************************
 * File Name: exports.js
 * Description: Has exports for accompanying component file.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";

import { fonts, colors } from "../../assets/common";




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
        fontFamily: fonts[1],
        borderRadius: '1em',
        textAlign: 'center', 
        marginTop: '2em',
        marginRight: '8em',
        marginLeft: '8em',
        
        animationName: '$title-animation',
        animationDuration: '1.5s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    },
    mobileTitle: {
        fontFamily: fonts[1],
        borderRadius: '1em',
        textAlign: 'center', 
        marginTop: '2em',
        marginRight: '1em',
        marginLeft: '1em',
        
        animationName: '$title-animation',
        animationDuration: '1.5s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    },
    '@keyframes title-animation': {
        '0%': {
            backgroundColor: '#d8e9f4',
            border: 'solid 0.005em ' + colors[3],
            fontSize: '0.25em',
            padding: '0.05em'
        }, 
        '50%': {
            backgroundColor: colors[2], 
            border: 'solid 0.1em ' + colors[2],
            fontSize: '1em',
            padding: '0.25em',
        },
        '100%': {
            backgroundColor: colors[3], 
            border: 'solid 0.1em ' + colors[4],
            fontSize: '2.5em',
            padding: '0.5em',
        }
    },
    subheader: { 
        fontFamily: fonts[0],
        display: 'flex',
        flexDirection: 'column',
    },
    author: {
        fontFamily: fonts[0],
        fontSize: '2em',
        textAlign: 'center',
        borderRadius: '0.5em',
        marginTop: '2em',
        marginLeft: '12em',
        marginRight: '12em',
        marginBottom: '1em',
    
        animationName: '$sub-animation',
        animationDuration: '0.75s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    }, 
    mobileAuthor: {
        fontFamily: fonts[0],
        fontSize: '2em',
        textAlign: 'center',
        borderRadius: '0.5em',
        marginTop: '2em',
        marginLeft: '2em',
        marginRight: '2em',
        marginBottom: '1em',
    
        animationName: '$sub-animation',
        animationDuration: '0.75s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    }, 
    notes: {
        textAlign: 'center',
        borderRadius: '1em',
        marginRight: '20em',
        marginLeft: '20em',
        marginBottom: '5em',
        
        animationName: '$sub-animation',
        animationDuration: '0.75s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    }, 
    mobileNotes: {
        textAlign: 'center',
        borderRadius: '1em',
        marginRight: '2em',
        marginLeft: '2em',
        marginBottom: '5em',
        
        animationName: '$sub-animation',
        animationDuration: '0.75s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    }, 
    '@keyframes sub-animation': {
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
    mobileBody: {
        textAlign: 'center',
        borderRadius: '1em',
        
        animationName: '$mobile-body-animation',
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
        '70%': {
            fontSize: '1em',
            padding: '4em',
            margin: '6em',
            marginLeft: '8em',
            marginRight: '8em',
            border: 'solid 0.75em ' + colors[4],
            backgroundColor: colors[1]
        },
        '100%': {
            fontSize: '1.25em',
            padding: '4em',
            marginTop: '2em',
            marginLeft: '10em',
            marginRight: '10em',
            marginBottom: '2em',
            border: 'solid 0.25em ' + colors[4],
            backgroundColor: '#ebe6bf',
        }
    },
    '@keyframes mobile-body-animation': {
        '0%': {
            fontSize: '0.25em',
            border: 'solid 0.025em #3E92CC',
            backgroundColor: '#FFEC60',
            margin: '2em',
            marginTop: '8em'
        },
        '70%': {
            fontSize: '1em',
            padding: '7em',
            margin: '6em',
            marginLeft: '2em',
            marginRight: '2em',
            border: 'solid 0.75em ' + colors[4],
            backgroundColor: colors[1]
        },
        '100%': {
            fontSize: '1.25em',
            padding: '1em',
            marginTop: '2em',
            marginLeft: '1em',
            marginRight: '1em',
            marginBottom: '2em',
            border: 'solid 0.25em ' + colors[4],
            backgroundColor: colors[3],
        }
    }
});