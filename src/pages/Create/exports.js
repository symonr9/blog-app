import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  wordLookupDiv: {
    
  },
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
    height: "15em",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginBottom: "1em",
    borderRadius: "10px",
    backgroundColor: 'transparent'
  },
  wordCard: {
    width: "12em",
    marginBottom: "0.25em",
    marginRight: "0.25em",
    border: '2px solid #bebebe',
    borderRadius: '5px',
  },
  mobileWord: {
    fontSize: "1.5em"
  },
  mobileRating: {
    fontSize: "1em",
    float: "right",
    marginTop: '0.1em',
    marginRight: "0.5em",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    paddingTop: "0.25em",
    paddingBottom: "0.25em",
    borderRadius: "100px",
    backgroundColor: "lightblue"
  },
  mobileWordCard: {
    width: '15em',
    marginBottom: "0.25em",
    marginRight: "0.25em",
    border: '2px solid #bebebe',
    borderRadius: '5px',
  },
  spacing: {
    marginTop: "0.75em",
    marginBottom: "0.75em"
  },
  switchViewBtn: {

  },
  wordLookupDiv: {
  },
  sideWordLookupDiv: {
    float: 'left',
    display: 'inline-block',
    width: '42vw',
  },
  formDiv: {
  },
  sideFormDiv: {
    float: 'left',
    display: 'inline-block',
    width: '42vw',
    marginRight: '2em',
  },
  bodyDiv: {
    marginTop: '3em'
  },
  sideBodyDiv: {
    marginTop: '3em',
  }
});

//types was here before but I took it out so I could 
//pass in the handle change function defined within
//the Create function. There's probably a way to 
//optimize it but for now I'll move it over.

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
