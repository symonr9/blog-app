import { makeStyles } from "@material-ui/core/styles";

const useCommonStyles = makeStyles({
  bodyDiv: {
    height: "100%",
    width: "90vw",
    marginLeft: "1em",
    marginRight: "1em",
    marginTop: "3em",
    marginBottom: "1em"
  },
  mobileBodyDiv: {
    height: "100%",
    width: "50vw",
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "8.5em",
    marginTop: "4em",
    marginBottom: "1em"
  },
  blankDiv: {
    marginTop: "20em"
  },
  submitBtnDiv: {
    marginTop: "2em",
    marginBottom: "2em"
  },
  formDiv: {
    "& > *": {
      color: 'red',
      marginTop: "0.5em"
    }
  }
});

export default useCommonStyles;
