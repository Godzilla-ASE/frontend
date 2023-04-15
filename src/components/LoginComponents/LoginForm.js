import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  InputAdornment,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import LoginStatus from "./LoginStatus";
import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import LoginSubmit from "../Wrapper/LoginSubmit";

function LoginForm(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernamecorrectError, setUsernamecorrectError] = useState(false);
  const [passwordcorrectError, setPasswordcorrectError] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
    setUsernamecorrectError(false);
    setLoginStatus("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setPasswordcorrectError(false);
    setLoginStatus("");
  };

  return (
    <Box className="login-container">
      <Box className="login-form-container">
        <form onSubmit={(event) => LoginSubmit(event, username, password, setUsernameError, setPasswordError, setUsernamecorrectError, setPasswordcorrectError, setLoginStatus)} className="signup-form">
          <UsernameInput
            username={username}
            handleUsernameChange={handleUsernameChange}
            usernameError={usernameError}
            usernamecorrectError={usernamecorrectError}
          />
          <PasswordInput
            password={password}
            handlePasswordChange={handlePasswordChange}
            passwordError={passwordError}
            passwordcorrectError={passwordcorrectError}
          />
          <Button variant="contained" color="primary" type="submit" className="login-button">
            Log In
          </Button>
          <LoginStatus loginStatus={loginStatus} />
        </form>
      </Box>
      <Box align="center" className="link-to-signup">
        <Typography variant="body3">
          Don't have an account?{" "}
          <Link href="/signup" variant="body3" style={{ color: "black" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginForm;