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
    title: {
        color: colors[5]
    }
});