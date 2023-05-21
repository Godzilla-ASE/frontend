import React from "react";
import {Typography} from "@mui/material";
import StyledTextField from '../Inputs/StyledTextField'

function EmailSet({
                    email,
                    setEmail,
                    setEmailError,
                    emailError
                  }) {
  const handleEmailChange = (event) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value)) {
      setEmailError(false)
    }
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleEmailBlur = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true)
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