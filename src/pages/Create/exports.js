import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  word: {
    fontSize: "1.5em"
  },
  rating: {
    fontSize: "0.75em",
    float: "right",
    marginTop: "0.50em !important",
    marginRight: "0.5em",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    paddingTop: "0.25em",
    paddingBottom: "0.25em",
    borderRadius: "100px",
    backgroundColor: "lightblue"
  },
  wordCardContainer: {
    overflowY: "scroll",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginBottom: "1em",
    borderRadius: "10px",
    boxShadow: "5px 5px #bebebe"
  },
  wordCard: {
    width: "12em",
    marginBottom: "0.25em",
    marginRight: "0.25em",
    "& :hover": {
      backgroundColor: "lightgray",
      cursor: "pointer"
    }
  },
  mobileWord: {
    fontSize: "1em"
  },
  mobileRating: {
    fontSize: "0.5em",
    float: "right",
    marginTop: "0.50em !important",
    marginRight: "0.5em",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    paddingTop: "0.25em",
    paddingBottom: "0.25em",
    borderRadius: "100px",
    backgroundColor: "lightblue"
  },
  mobileWordCardContainer: {
    overflowY: "scroll",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    marginBottom: "1em",
    borderRadius: "10px",
    boxShadow: "5px 5px #bebebe"
  },
  mobileWordCard: {
    width: "8em",
    marginBottom: "0.25em",
    marginRight: "0.25em",
    "& :hover": {
      backgroundColor: "lightgray",
      cursor: "pointer"
    }
  },
  spacing: {
    marginTop: "0.75em",
    marginBottom: "0.75em"
  }
});

export const poemTypes = [
  {
    value: "Prose",
    label: "Prose"
  },
  {
    value: "Iambic Pentameter",
    label: "Iambic Pentameter"
  },
  {
    value: "Sonnet",
    label: "Sonnet"
  },
  {
    value: "Custom",
    label: "Custom"
  }
];

export const kinds = [
  {
    value: "synonyms",
    label: "Synonyms"
  },
  {
    value: "antonyms",
    label: "Antonyms"
  },
  {
    value: "narrower",
    label: "Narrower"
  },
  {
    value: "broader",
    label: "Broader"
  },
  {
    value: "rhymes",
    label: "Rhymes"
  }
];
