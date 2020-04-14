/***********************************************************************
 * File Name: FormElement.js
 * Description: Component for different form elements that are used on
 * the Create page and the Edit page.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React from "react";

import { Button, TextField, MenuItem } from "@material-ui/core";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
/**********************************************************************/

//Custom stylings.
const textFieldStyle = {
  marginTop: "1em",
  marginBottom: "1em",
};

const submitBtnStyle = {
  marginTop: "2em",
  marginBottom: "2em",
};

//SubmitBtn JSX element. Assumes that it is wrapped within a form.
export const submitBtn = (value) => {
  return (
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

//Fixme: Remove all calls of basicTextField and use editTextField instead. 
//The reason that there are two elements for TextField is because editTextField
//is being used in Edit.js to edit fields that already exist. The value is set
//as defaultValue, and so it works for existing data. But the TextFields for 
//Create.js don't have pre-existing values, and in order to add a value element,
//a function would need to be passed in and additional hooks would need to be 
//implemented.

export const basicTextField = (name, label, onChangeFun, numOfLines = 1) => {
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
      onChange={onChangeFun}
    ></TextField>
  );
};

export const passwordTextField = (name, label, onChangeFun, numOfLines = 1) => {
  return (
    <TextField
      id={name + "TextField"}
      name={name}
      type="password"
      label={label}
      placeholder="Start writing..."
      variant="outlined"
      multiline={!(numOfLines == 1)}
      rows={numOfLines}
      fullWidth
      style={textFieldStyle}
      onChange={onChangeFun}
    ></TextField>
  );
};

export const editTextField = (
  name,
  value,
  label,
  onChangeFun,
  numOfLines = 1
) => {
  return (
    <TextField
      id={name + "TextField"}
      name={name}
      defaultValue={value}
      label={label}
      placeholder="Start writing..."
      variant="outlined"
      multiline={!(numOfLines == 1)}
      rows={numOfLines}
      fullWidth
      style={textFieldStyle}
      onChange={onChangeFun}
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
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
