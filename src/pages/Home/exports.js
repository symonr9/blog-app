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
        fontSize: '3.5em',
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
    smallSpacingDiv: {
        marginTop: '10em'
    }
});