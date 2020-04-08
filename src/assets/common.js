import { makeStyles } from "@material-ui/core/styles";

//miasa
//export const colors = ["white", "#FC354C", "#13747D", "#0ABFBC", "#FCF7C5"];

//onaso
export const colors = ["white", "#B3EFBB", "#5FD18C", "#AB9CD2", "#FAF692"];

export const useCommonStyles = makeStyles({
  bodyDiv: {
    height: "100%",
    width: "90vw",
    marginLeft: "1em",
    marginRight: "1em",
  },
  mobileBodyDiv: {
    height: "100%",
    width: "90vw",
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "1em",
  },
  blankDiv: {
    marginTop: "20em"
  },
  formDiv: {
    "& > *": {
      marginTop: "0.5em"
    }
  },
  spacingTop: {
    marginBottom: '4em'
  },
  containerDiv: {
    display: 'flex',
    flexFlow: "row wrap",
    marginBottom: '5em'
  },
  itemDiv: {
    flex: '30%',
    padding: '10px',
    backgroundColor: 'transparent',
    width: '100px',
    marginRight: '1em',
    marginBottom: '1em',
    "& a": {
      textDecoration: 'none',
      color: 'black',
      "& :hover": {
        color: 'darkblue',
      }
    }
  },
  mobileItemDiv: {
    flex: '100%',
    padding: '10px',
    backgroundColor: 'transparent',
    width: '90%',
    marginRight: '1em',
    marginBottom: '1em',
    "& a": {
      textDecoration: 'none',
      color: 'black',
      "& :hover": {
        color: 'darkblue',
      }
    },
  },
  title: {
    fontSize: '1.3em',
    display: 'block',
    fontWeight: 'bold',
  },
  body: {
    fontSize: '1em',
    display: 'block',
    marginTop: '0.75em',
    marginBottom: '0.75em',
    whiteSpace: 'pre-wrap',
  },
  createdBy: {
    fontSize: '0.8em',
    display: 'block'
  },
  smallText: {
    fontSize: '0.75em',
    display: 'block'
  },
  createdAt: {
    fontSize: '0.75em',
    display: 'block',
    position: 'relative',
    bottom: '0'
  },
  sortWidget: {
    cursor: 'pointer',
    color: 'black',
  },
  
});