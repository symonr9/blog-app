import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles({
    quoteContainerDiv: {
      display: 'flex',
      flexFlow: "row wrap",
      marginBottom: '5em'
    },
    quoteDiv: {
      flex: '30%',
      padding: '10px',
      backgroundColor: 'transparent',
      width: '100px',
      marginRight: '1em',
      marginBottom: '1em',
      overflowY: 'auto',
      maxHeight: '10em',
      "& a": {
        textDecoration: 'none',
        color: 'black',
        "& :hover": {
          color: 'darkblue'
        }
      },
    },
    text: {
      marginTop: '0.1em',
      fontSize: '1.6em',
      display: 'block',
      fontStyle: 'italic',
      whiteSpace: 'pre-wrap',
    },
    author: {
      fontSize: '1.1em',
      display: 'block',
      marginBottom: '1em',
    },
    createdAt: {
      fontSize: '0.75em',
      display: 'block',
      position: 'relative',
      bottom: '0',
    }
  });