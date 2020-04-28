/***********************************************************************
 * File Name: exports.js
 * Description: Has exports for accompanying component file.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";

import { colors } from "../../assets/common";

export const useStyles = makeStyles({
    profileContainerDiv: {
        height: '20em',
        overflowY: 'scroll',
        display: 'flex',
        flexFlow: 'row wrap',
        marginBottom: '2em',
        border: 'solid 1px grey',
        borderRadius: '10px',
    },
    userDiv: {
        padding: '1.5em',
        backgroundColor: colors[3]
    },
    bio: {
        marginBottom: '3em',
    },
    email: {
        marginBottom: '1em'
    },
    prefsDiv: {
        display: 'flex',
        marginBottom: '1em',
        justifyContent: 'space-between'
    },
    prefs: {
        flex: '15%',
        marginLeft: '0.5em',
        marginRight: '0.5em'
    }
});