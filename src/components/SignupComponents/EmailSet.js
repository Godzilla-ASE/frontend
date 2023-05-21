import React,{useState} from "react";
import { Typography } from "@mui/material";
import StyledTextField from '../Inputs/StyledTextField'

function EmailSet({ email,
  setEmail,
  setIsFieldValid }) {

  const [emailError, setEmailError] = useState(false);
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleEmailChange = (event) => {
    //if not consist as the style of XX@XX.XX
    if (emailRegex.test(event.target.value)) {
      setEmailError(false)
      setIsFieldValid((prevState) => ({
        ...prevState,
        email: true
      }));
    }
    setEmail(event.target.value);

  };

  const handleEmailBlur = () => {
    if (!emailRegex.test(email)) {
      setEmailError(true)
      setIsFieldValid((prevState) => ({
        ...prevState,
        email: false
      }));
    }
  }

  return (
    <>
      <StyledTextField
        value={email}
        onChange={handleEmailChange}
        label="Email"
        color="primary"
        focused
        error={emailError}
        onBlur={handleEmailBlur}
      />
      {
        emailError &&
        <Typography variant="body2" color="error" align="center" fontWeight={700}>
          Please enter a valid email.
        </Typography>
      }
    </>
  );
};

export default EmailSet;