import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles({
    proseContainerDiv: {
      display: 'flex',
      flexFlow: "row wrap",
      marginBottom: '5em'
    },
    proseDiv: {
      flex: '30%',
      padding: '10px',
      backgroundColor: 'transparent',
      width: '100px',
      marginRight: '1em',
      marginBottom: '1em',
      overflowY: 'hidden',
      maxHeight: '10em',
    },
    title: {
        fontSize: '1.3em',
        display: 'block',
        fontWeight: 'bold',
        color: 'black',
        textDecoration: 'none',
    },
    body: {
    fontSize: '1em',
    display: 'block',
    marginTop: '0.75em',
    marginBottom: '0.75em',
    whiteSpace: 'pre-wrap',
    },
    createdAt: {
      fontSize: '0.75em',
      display: 'block',
      position: 'relative',
      bottom: '0',
    }
  });