/***********************************************************************
 * File Name: exports.js
 * Description: Has exports for accompanying component file.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";
import { fonts, colors } from "../../assets/common";

export const useStyles = makeStyles({
    logo: {
        width: '70vw',
        height: '75vh',
        margin: '0 !important',
        marginTop: '10em !important',
        marginBottom: '0em !important',
        textAlign: 'center',
    },
    mobileLogo: {
        marginTop: '5em !important'
    },
    introTitle: {
        fontFamily: fonts[1],
        fontSize: '3em',
        color: colors[5],
        fontWeight: 'bold',
        marginBottom: '0.25em',
    },
    introText: {
        fontFamily: fonts[2],
        fontSize: '1.5em',
        marginLeft: '1.5em'
    },
    homeSpacingDiv: {
        marginTop: '20em'
    },
    homePaper: {
        marginTop: '10em'
    },
    endPaper: {
        marginBottom: '10em'
    },
    paperAnimation: {
        borderRadius: '1em',
        
        animationName: '$paper-animation',
        animationDuration: '1.5s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    },
    '@keyframes paper-animation': {
        '0%': {
            fontSize: '2em',
            border: 'solid 0.025em #3E92CC',
            backgroundColor: colors[2],
        },  
        '70%': {
            fontSize: '1em',
            padding: '4em',
            margin: '6em',
            marginLeft: '8em',
            marginRight: '8em',
            border: 'solid 0.75em ' + colors[2],
            backgroundColor: colors[1]
        },
        '100%': {
            padding: '2em',
            backgroundColor: colors[3],
        }
    },
    mobilePaperAnimation: {
        borderRadius: '1em',
        
        animationName: '$mobile-paper-animation',
        animationDuration: '1.5s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-in-out'
    },
    '@keyframes mobile-paper-animation': {
        '0%': {
            fontSize: '1.25em',
            border: 'solid 0.025em #3E92CC',
            backgroundColor: colors[2],
        },  
        '70%': {
            fontSize: '0.5em',
            padding: '6em',
            border: 'solid 0.75em ' + colors[2],
            backgroundColor: colors[1]
        },
        '100%': {
            padding: '3em',
            fontSize: '0.75em',
            marginLeft: '1em',
            marginRight: '2em',
            backgroundColor: colors[3],
        }
      },
});