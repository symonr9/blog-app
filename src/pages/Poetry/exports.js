import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles({
    poemContainerDiv: {
      display: 'flex',
      flexFlow: "row wrap",
      marginBottom: '5em'
    },
    poemDiv: {
      flex: '30%',
      padding: '10px',
      backgroundColor: 'transparent',
      width: '100px',
      marginRight: '1em',
      marginBottom: '1em',
    },
    title: {
      fontSize: '1.3em',
      display: 'block',
      fontWeight: 'bold',
    },
    createdBy: {
      fontSize: '0.8em',
      display: 'block'
    },
    body: {
      fontSize: '1em',
      display: 'block',
      marginTop: '0.75em',
      marginBottom: '0.75em'
    },
    notes: {
      fontSize: '0.75em',
      display: 'block'
    },
    type: {
      fontSize: '0.75em',
      display: 'block'
    },
    createdAt: {
      fontSize: '0.75em',
      display: 'block',
      position: 'relative',
      bottom: '0'
    }
  });