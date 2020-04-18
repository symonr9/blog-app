/***********************************************************************
 * File Name: exports.js
 * Description: Has exports for accompanying component file.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../assets/common";

export const useStyles = makeStyles({
    logo: {
        width: '70vw',
        height: '75vh',
        margin: '0 !important',
        marginTop: '0em !important',
        marginBottom: '0em !important',
        textAlign: 'center',
    },
    mobileLogo: {
        marginTop: '5em !important'
    },
    introTitle: {
        fontSize: '4em',
        color: colors[5],
        fontWeight: 'bold'
    },
    introQuote: {
        marginTop: '2em',
        fontStyle: 'italic'
    },
    introSub: {
        marginTop: '2em'
    }
});