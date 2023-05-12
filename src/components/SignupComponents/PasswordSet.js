import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography
} from "@mui/material";

import StyledTextField from '../Inputs/StyledTextField'

function PasswordSet({
  password,
  passwordError,
  confirmPassword,
  confirmPasswordError,
  setPassword,
  setConfirmPassword,
  setPasswordError,
  setConfirmPasswordError,
  setPageStatus,
  setPasswordChanged
}) {

  const hasLowerCase = /.*[a-z]+.*/;
  const hasUpperCase = /.*[A-Z]+.*/;
  const hasNumber = /.*\d+.*/;
  // /.*[,.?!@#$%^&+-_=*]+.*/ #TODO 这个写法有点问题，+-_不会匹配加号、减号、下划线，而是会匹配加号和下划线之间的所有内容，包括大写字母和数字。
  const hasSymbol = /[,.?!@#$%^&_=+-]+/
  const length8To16 = /^.{8,16}$/;

  const handlePasswordChange = (event) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[,.?!@#$%^&+-_=*]).{8,16}$/.test(event.target.value)) {
      setPasswordError(true);
    } else {
      setPasswordError(false)
    }
    setPassword(event.target.value);
    setPasswordChanged(true);

    if (confirmPassword !== event.target.value) {
      setConfirmPasswordError(true)
    } else {
      setConfirmPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    if (event.target.value !== password) {
      setConfirmPasswordError(true)
    } else {
      setConfirmPasswordError(false);
    }
    setConfirmPassword(event.target.value);

  };

  return (
    <>
      <StyledTextField
        value={password}
        onChange={handlePasswordChange}
        label="Password"
        color="primary"
        focused
        error={passwordError}
      />
      <Typography variant="body2" component="div">
        <ul>
          <li style={{ color: length8To16.test(password) ? 'green' : 'white', fontWeight: 700 }}>Between 8-16 charaters.</li>
          <li style={{ color: hasLowerCase.test(password) ? 'green' : 'white', fontWeight: 700 }}>Has at least one lowercase letter.</li>
          <li style={{ color: hasUpperCase.test(password) ? 'green' : 'white', fontWeight: 700 }}>Has at least one uppercase letter.</li>
          <li style={{ color: hasNumber.test(password) ? 'green' : 'white', fontWeight: 700 }}>Has at least one number.</li>
          <li style={{ color: hasSymbol.test(password) ? 'green' : 'white', fontWeight: 700 }}>Has at least one special symbol.</li>
        </ul>
      </Typography>
      <StyledTextField
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        label="Confirm Password"
        color="primary"
        focused
        error={confirmPasswordError}
      />
      {/* <Box className="setPassword">
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
            <FormHelperText sx={{ fontSize: 'body2.fontSize', color: passwordError ? 'red' : 'secondary.main' }}>
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
            <FormHelperText sx={{ fontSize: 'body2.fontSize', color: 'error' }}>
              Please type in the same password
            </FormHelperText>}
        </FormControl>
      </Box> */}
    </>
  );
};

export default PasswordSet;