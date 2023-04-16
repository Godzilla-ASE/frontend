import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

function PasswordSet({
  password,
  passwordError,
  confirmPassword,
  confirmPasswordError,
  setPassword,
  setConfirmPassword,
  setPasswordError,
  setConfirmPasswordError,
  setPageStatus
}){
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setPageStatus("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(false);
    setPageStatus("");
  };

  return (
    <Box className="setPassword">
      <FormControl variant="outlined" className="signup-input">
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <OutlinedInput
              id="password-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              label="Password"
              error={passwordError}
            />
            { 
            <FormHelperText sx={{color: passwordError ? 'red' : 'inherit'}}>
              Must be between 8 and 16 characters, contain at least
              one uppercase letter, one lowercase letter, one number and one
              special character.
              </FormHelperText>}
          </FormControl>
          <FormControl variant="outlined" className="signup-input">
            <InputLabel htmlFor="confirm-password-input">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirm-password-input"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              label="Confirm Password"
              error={confirmPasswordError}
            />
            {confirmPasswordError &&
            <FormHelperText sx={{  color: 'error' }}>
              Please type in the same password
              </FormHelperText>}
          </FormControl>
    </Box>
  );
};

export default PasswordSet;