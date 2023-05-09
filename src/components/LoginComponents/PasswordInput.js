import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  Link,
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
    // <FormControl variant="outlined" className="login-input">
    //   <InputLabel htmlFor="password-input">Password</InputLabel>
    //   <OutlinedInput
    //     id="password-input"
    //     type="password"
    //     value={password}
    //     onChange={handlePasswordChange}
    //     label="Password"
    //     error={passwordError && passwordcorrectError}
    /*endAdornment={
      
      <InputAdornment position="end">
        {/* <Button color="primary" size="small" className="login-forgot-button">
          Forgot?
        </Button> *//*}
<Link href="/forgetPassword" color="primary" size="small" className="login-forgot-button" style={{ color: "black" }}>
  Forgot?
</Link>
</InputAdornment>
}*/
    // />
    // {passwordError && <FormHelperText sx={{ fontSize:'body2.fontSize', color: 'red' }}>Please enter your password.</FormHelperText>}
    // {passwordcorrectError && <FormHelperText sx={{ fontSize:'body2.fontSize',color: 'red' }}>Please enter correct password.</FormHelperText>}
    // </FormControl>
  );
}

export default PasswordInput;