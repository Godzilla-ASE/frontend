import React, { useState } from "react";
import {
  Typography
} from "@mui/material";
import StyledTextField from '../Inputs/StyledTextField'

function PasswordInput({
  password,
  setPassword,
  passwordcorrectError,
  setPasswordcorrectError
}) {
  const [noPasswordError, setNoPasswordError] = useState(false)

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if(event.target.value){
      setNoPasswordError(false);
    }
    else{
      setNoPasswordError(true);
    }
    setPasswordcorrectError(false);

  };

  const handlePasswordBlur = () => {
    //if empty
    if (password.length === 0) {
      setNoPasswordError(true)
    }
  }
  return (
    <>
      <StyledTextField
        value={password}
        onChange={handlePasswordChange}
        label="Password"
        color="primary"
        focused
        error={noPasswordError || passwordcorrectError}
        onBlur={handlePasswordBlur}
      />
      {
        noPasswordError &&
        <Typography variant="body2" color="error" align="center" fontWeight={700}>
          Please enter your password.
        </Typography>
      }
      {
        passwordcorrectError &&
        <Typography variant="body2" color="error" align="center" fontWeight={700}>
          The password is wrong! Please enter the correct one.
        </Typography>
      }
    </>
  );
}

export default PasswordInput;