/***********************************************************************
 * File Name: exports.js
 * Description: Has exports for accompanying component file.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    profileContainerDiv: {
        height: '20em',
        overflowY: 'scroll',
        display: 'flex',
        flexFlow: 'row wrap',
        marginBottom: '2em',
        border: 'solid 1px grey',
        borderRadius: '10px',
    }
});