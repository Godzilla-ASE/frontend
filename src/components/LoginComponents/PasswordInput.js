import React from "react";
import {
  Typography
} from "@mui/material";
import StyledTextField from '../Inputs/StyledTextField'

function PasswordInput({
  password,
  handlePasswordChange,
  passwordError,
  passwordcorrectError,
}) {
  return (
    <>
      <StyledTextField
        value={password}
        onChange={handlePasswordChange}
        label="Password"
        color="primary"
        focused
        error={passwordError && passwordcorrectError}
      />
      {
        passwordError &&
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