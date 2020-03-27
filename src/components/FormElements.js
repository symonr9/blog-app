import React, { Component }  from 'react';
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import { Button, TextField, MenuItem } from "@material-ui/core";

export const submitBtn = (
      <Button
        variant="contained"
        color="primary"
        startIcon={<PublishRoundedIcon />}
        type="submit"
      >
        Publish
      </Button>
  );

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
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  };