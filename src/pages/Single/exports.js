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
        borderRadius: '0.5em',
        textAlign: 'center', 
        marginTop: '2em',
        marginRight: '4em',
        marginLeft: '4em',
        boxShadow: '5px 5px 5px 5px ' + colors[4],
        
        animationName: '$title-animation',
        animationDuration: '1s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    },
    mobileTitle: {
        fontFamily: fonts[1],
        borderRadius: '0.5em',
        textAlign: 'center', 
        marginTop: '2em',
        marginRight: '4em',
        marginLeft: '4em',
        boxShadow: '5px 5px 5px 5px ' + colors[4],
        
        animationName: '$title-animation',
        animationDuration: '1s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    },
    quote: {
        fontFamily: fonts[3],
        borderRadius: '0.5em',
        textAlign: 'center', 
        marginTop: '2em',
        marginRight: '0.5em',
        marginLeft: '0.5em',
        boxShadow: '5px 5px 5px 5px ' + colors[4],

        animationName: '$quote-animation',
        animationDuration: '1s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    },
    '@keyframes title-animation': {
        '0%': {
            backgroundColor: colors[2],
            border: 'solid 0.005em ' + colors[3],
            fontSize: '1em',
            padding: '0.05em'
        }, 
        '100%': {
            backgroundColor: colors[3], 
            border: 'solid 0.1em ' + colors[4],
            fontSize: '2.5em',
            padding: '0.5em',
        }
    },
    '@keyframes quote-animation': {
        '0%': {
            backgroundColor: colors[2],
            border: 'solid 0.005em ' + colors[3],
            fontSize: '1em',
            padding: '0.05em'
        }, 
        '100%': {
            backgroundColor: colors[3], 
            border: 'solid 0.1em ' + colors[4],
            fontSize: '1.5em',
            padding: '2em',
        }
    },
    mobileQuote: {
        fontFamily: fonts[3],
        borderRadius: '0.5em',
        textAlign: 'center', 
        marginTop: '2em',
        marginRight: '0.5em',
        marginLeft: '0.5em',
        boxShadow: '5px 5px 5px 5px ' + colors[4],
        
        animationName: '$quote-animation',
        animationDuration: '1s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    },
    subheader: { 
        fontFamily: fonts[0],
        display: 'flex',
        flexDirection: 'column',
    },
    author: {
        fontFamily: fonts[0],
        textAlign: 'center',
        borderRadius: '0.5em',
        marginTop: '2em',
        marginLeft: '24em',
        marginRight: '24em',
        marginBottom: '1em',
        boxShadow: '3px 3px 3px 3px ' + colors[4],
        opacity: '0.9',
    
        animationName: '$sub-animation',
        animationDuration: '0.75s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    }, 
    mobileAuthor: {
        fontFamily: fonts[0],
        textAlign: 'center',
        borderRadius: '0.5em',
        marginTop: '2em',
        marginLeft: '4.5em',
        marginRight: '4.5em',
        marginBottom: '1em',
        boxShadow: '3px 3px 3px 3px ' + colors[4],
        opacity: '0.9',
    
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
        boxShadow: '3px 3px 3px 3px ' + colors[4],
        
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
        boxShadow: '3px 3px 3px 3px ' + colors[4],
        
        animationName: '$sub-animation',
        animationDuration: '0.75s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    }, 
    '@keyframes sub-animation': {
        '0%': {
            fontSize: '0.5em',
            padding: '0.25em',
            backgroundColor: colors[2]
        },
        '100%': {
            fontSize: '1em',
            padding: '0.5em',
            border: 'solid 0.1em #333745',
            backgroundColor: colors[3]
        }
    }, 
    body: {
        fontFamily: fonts[3],
        textAlign: 'center',
        borderRadius: '0.5em',
        boxShadow: '5px 5px 5px 5px ' + colors[4],
        opacity: 0.95,
        
        animationName: '$body-animation',
        animationDuration: '0.5s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    },
    mobileBody: {
        fontFamily: fonts[3],
        textAlign: 'center',
        borderRadius: '0.5em',
        boxShadow: '5px 5px 5px 5px ' + colors[4],
        opacity: 0.95,
        
        animationName: '$mobile-body-animation',
        animationDuration: '0.5s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    },
    '@keyframes body-animation': {
        '0%': {
            fontSize: '0.25em',
            border: 'solid 0.025em #3E92CC',
            backgroundColor: colors[2],
            margin: '2em',
            marginTop: '8em'
        },
        '100%': {
            fontSize: '1.25em',
            padding: '2em',
            marginTop: '2em',
            marginLeft: '8em',
            marginRight: '8em',
            marginBottom: '2em',
            border: 'solid 0.25em ' + colors[4],
            backgroundColor: colors[3],
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
        '100%': {
            fontSize: '1.25em',
            padding: '1em',
            marginTop: '2em',
            marginLeft: '0.5em',
            marginRight: '0.5em',
            marginBottom: '2em',
            border: 'solid 0.25em ' + colors[4],
            backgroundColor: colors[3],
        }
    }
});