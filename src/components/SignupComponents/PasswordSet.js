import React, {useState} from "react";
import {
  Typography
} from "@mui/material";

import StyledTextField from '../Inputs/StyledTextField'

function PasswordSet({
  password,
  setPassword,
  setIsFieldValid
}) {

  const hasLowerCase = /[a-z]/;
  const hasUpperCase = /[A-Z]/;
  const hasNumber = /\d/;
  const hasSymbol = /[,.?!@#$%^&_=+-]+/
  const length8To16 = /^.{8,16}$/;

  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (event) => {
    //if the password not fulfill the requirement
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[,.?!@#$%^&_=+-]).{8,16}$/.test(event.target.value)) {
      setPasswordError(true);
      setIsFieldValid((prevState) => ({
        ...prevState,
        password: false
      }));
    } else {
      setPasswordError(false)
      setIsFieldValid((prevState) => ({
        ...prevState,
        password: true
      }));
    }
    setPassword(event.target.value);

    //if the confirm part not the same as the password part
    if (confirmPassword !== event.target.value) {
      setConfirmPasswordError(true)
      setIsFieldValid((prevState) => ({
        ...prevState,
        password: false
      }));
    } else {
      setConfirmPasswordError(false);
      setIsFieldValid((prevState) => ({
        ...prevState,
        password: true
      }));
    }
  };

  const handleConfirmPasswordChange = (event) => {
    //when first type in the confirm part
    if(password === ""){
      setPasswordError(true);
    }
    //when not the same
    if (event.target.value !== password) {
      setConfirmPasswordError(true)
      setIsFieldValid((prevState) => ({
        ...prevState,
        password: false
      }));
    } else {
      setConfirmPasswordError(false);
      setIsFieldValid((prevState) => ({
        ...prevState,
        password: true
      }));
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
          <li style={{color: length8To16.test(password) ? 'green' : 'white', fontWeight: 700}}>Between 8-16
            characters.
          </li>
          <li style={{color: hasLowerCase.test(password) ? 'green' : 'white', fontWeight: 700}}>Has at least one
            lowercase letter.
          </li>
          <li style={{color: hasUpperCase.test(password) ? 'green' : 'white', fontWeight: 700}}>Has at least one
            uppercase letter.
          </li>
          <li style={{color: hasNumber.test(password) ? 'green' : 'white', fontWeight: 700}}>Has at least one number.
          </li>
          <li style={{color: hasSymbol.test(password) ? 'green' : 'white', fontWeight: 700}}>Has at least one special
            symbol.
          </li>
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
    </>
  );
}

export default PasswordSet