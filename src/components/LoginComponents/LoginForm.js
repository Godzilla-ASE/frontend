import React, { useState } from "react";
import {
  Box,
  Button,
  Link,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';

import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import LoginSubmit from "../../services/LoginSubmit";
import GetPageStatus from "../GetPageStatus";
import { LOGIN_API } from "../../services/APIs";
import "./Login.css"
//import LoginStatus from "./LoginStatus";

function LoginForm(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernamecorrectError, setUsernamecorrectError] = useState(false);
  const [passwordcorrectError, setPasswordcorrectError] = useState(false);
  const [pageStatus, setPageStatus] = useState("");

  const location = useLocation();
  const previousUrl = location.state?.from === '/login' || location.state?.from === '/signup' ? '/' : location.state?.from ?? '/';
  const navigate = useNavigate(); 

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
    setUsernamecorrectError(false);
    setPageStatus("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setPasswordcorrectError(false);
    setPageStatus("");
  };

  return (
    <Box className="login-container">
      <Box className="login-form-container">
        <form onSubmit={(event) => LoginSubmit(event, username, password, 
          setUsernameError, setPasswordError, setUsernamecorrectError, setPasswordcorrectError, setPageStatus,
          LOGIN_API, navigate, previousUrl)} className="login-form">
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
          <GetPageStatus 
          pageStatus={pageStatus} 
          />
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