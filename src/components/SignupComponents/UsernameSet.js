import React from "react";
import {FormControl,InputLabel,OutlinedInput,FormHelperText} from "@mui/material";

function UsernameSet({username,
  usernameError,
  usernameexistError,
  setUsername,
  setUsernameError,
  setUsernameexistError,
  setPageStatus,
  setUsernameChanged
}){
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
    setUsernameexistError(false);
    setUsernameChanged(true);
    setPageStatus("");
  };

  return (
    <FormControl variant="outlined" className="signup-input">
            <InputLabel htmlFor="username-input">Username</InputLabel>
            <OutlinedInput
              id="username-input"
              type="username"
              value={username}
              onChange={handleUsernameChange}
              label="username"
              error={usernameError || usernameexistError}
            />
            {
            <FormHelperText sx={{color: usernameError ? 'red' : 'inherit'}}>
              Must be between 6 and 16 characters, alphanumeric only
              </FormHelperText>}
            {usernameexistError &&
            <FormHelperText sx={{  color: 'red' }}>
              Username exists, please try another 
              </FormHelperText>}
          </FormControl>
  );
};

export default UsernameSet;