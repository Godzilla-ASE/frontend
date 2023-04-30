import React from "react";
import {FormControl,InputLabel,OutlinedInput,FormHelperText} from "@mui/material";

function EmailSet ({email,
  setEmail,
  setEmailError,
  emailError,
  setPageStatus,
  setEmailChanged}){

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
    setEmailChanged(true);
    setPageStatus("");
  };

  return (
    <FormControl variant="outlined" className="signup-input">
        <InputLabel htmlFor="email-input">Email</InputLabel>
        <OutlinedInput
              id="email-input"
              type="email"
              value={email}
              onChange={handleEmailChange}
              label="Email"
              error={emailError}
        />
        {emailError &&
        <FormHelperText sx={{  color: 'red' }}>
          Please type in correct email 
          </FormHelperText>}
    </FormControl>
  );
};

export default EmailSet;