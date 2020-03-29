import React, { Component }  from 'react';
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import { Button, TextField, MenuItem } from "@material-ui/core";

const textFieldStyle = {
  marginTop: "1em",
  marginBottom: "1em"
};


const submitBtnStyle = {
  marginTop: "2em",
  marginBottom: "2em"
};

export const submitBtn = (value) => {
  return(
      <Button
        variant="contained"
        color="primary"
        startIcon={<PublishRoundedIcon />}
        type="submit"
        style={submitBtnStyle}
      >
        {value}
      </Button>
  );
};

  export const basicTextField = (name, label, numOfLines = 1) => {
    return (
      <TextField
        id={name + "TextField"}
        name={name}
        label={label}
        placeholder="Start writing..."
        variant="outlined"
        multiline={!(numOfLines == 1)}
        rows={numOfLines}
        fullWidth
        style={textFieldStyle}
      ></TextField>
    );
  };

 export const selectTextField = (name, label, value, onChangeFun, options) => {
    return (
      <TextField
        id={name + "Select"}
        name={name}
        label={label}
        placeholder="Start writing..."
        variant="outlined"
        value={value}
        select
        onChange={onChangeFun}
        fullWidth
        style={textFieldStyle}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  };