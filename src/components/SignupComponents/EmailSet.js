import React from "react";
import { Typography } from "@mui/material";
import StyledTextField from '../Inputs/StyledTextField'

function EmailSet({ email,
  setEmail,
  setEmailError,
  emailError,
  setPageStatus,
  setEmailChanged }) {

  const handleEmailChange = (event) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value)) {
      setEmailError(false)
    }
    setEmail(event.target.value);
    setEmailError(false);
    setEmailChanged(true);
    setPageStatus("");
  };

  const handleEmailBlur = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true)
    }
  }

  return (
    // <FormControl variant="outlined" className="signup-input">
    //     <InputLabel htmlFor="email-input">Email</InputLabel>
    //     <OutlinedInput
    //           id="email-input"
    //           type="email"
    //           value={email}
    //           onChange={handleEmailChange}
    //           label="Email"
    //           error={emailError}
    //     />
    //     {emailError &&
    //     <FormHelperText sx={{ fontSize:'body2.fontSize', color: 'red' }}>
    //       Please type in correct email 
    //       </FormHelperText>}
    // </FormControl>
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