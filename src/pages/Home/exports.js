/***********************************************************************
 * File Name: exports.js
 * Description: Has exports for accompanying component file.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../assets/common";

export const useStyles = makeStyles({
    homeLogo: {
        width: '40em',
        height: '40em',
        margin: '0',
        textAlign: 'center',
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