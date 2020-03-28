import { makeStyles } from "@material-ui/core/styles";

const useCommonStyles = makeStyles({
  bodyDiv: {
    height: "100%",
    width: "90vw",
    marginLeft: "1em",
    marginRight: "1em"
  },
  mobileBodyDiv: {
    height: "100%",
    width: "50vw",
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "8.5em"
  },
  blankDiv: {
    marginTop: "20em"
  },
  formDiv: {
    "& > *": {
      color: 'red',
      marginTop: "0.5em"
    }
  },
  spacingTop: {
    marginTop: '4em'
  }
  
});

export default useCommonStyles;
