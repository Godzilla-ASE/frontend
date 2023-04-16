import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  Link,
} from "@mui/material";

function PasswordInput({
  password,
  handlePasswordChange,
  passwordError,
  passwordcorrectError,
}) {
  return (
    <FormControl variant="outlined" className="login-input">
      <InputLabel htmlFor="password-input">Password</InputLabel>
      <OutlinedInput
        id="password-input"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        label="Password"
        error={passwordError && passwordcorrectError}
        endAdornment={
          <InputAdornment position="end">
            {/* <Button color="primary" size="small" className="login-forgot-button">
              Forgot?
            </Button> */}
            <Link href="/forgetPassword" color="primary" size="small" className="login-forgot-button" style={{ color: "black" }}>
              Forgot?
            </Link>
          </InputAdornment>
        }
        />
        {passwordError && <FormHelperText sx={{ color: 'red' }}>Please enter your password.</FormHelperText>}
        {passwordcorrectError && <FormHelperText sx={{ color: 'red' }}>Please enter correct password.</FormHelperText>}
        </FormControl>
        );
  }
        
  export default PasswordInput;