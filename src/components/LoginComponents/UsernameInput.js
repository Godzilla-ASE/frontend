import React, { useState } from "react";
import {
  Typography
} from "@mui/material";
import StyledTextField from '../Inputs/StyledTextField'

function UsernameInput({
  username,
  setUsername,
  usernamecorrectError,
  setUsernamecorrectError
}) {
  const [noNameError, setNoNameError] = useState(false)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if(event.target.value){
      setNoNameError(false);
    }
    else{
      setNoNameError(true);
    }
    setUsernamecorrectError(false);

  };

  const handleUserNameBlur = () => {
    //if empty
    if (username.length === 0) {
      setNoNameError(true)
    }
  }

  return (
    <>
      <StyledTextField
        value={username}
        onChange={handleUsernameChange}
        label="Username"
        color="primary"
        focused
        error={noNameError || usernamecorrectError}
        onBlur={handleUserNameBlur}
      />
      {
        noNameError &&
        <Typography variant="body2" color="error" align="center" fontWeight={700}>
          Please enter your username.
        </Typography>
      }
      {
        usernamecorrectError &&
        <Typography variant="body2" color="error" align="center" fontWeight={700}>
          The username is wrong! Please enter the correct one.
        </Typography>
      }
    </>
  );
}

export default UsernameInput;