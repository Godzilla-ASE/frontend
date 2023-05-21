import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useLocation } from 'react-router-dom';

import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import LoginSubmit from "../../services/LoginSubmit";
import { LOGIN_API, LOGO_API } from "../../services/APIs";
import "./Login.css"
import Notification from "../Notification";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernamecorrectError, setUsernamecorrectError] = useState(false);
  const [passwordcorrectError, setPasswordcorrectError] = useState(false);

  const [logInSuccess, setLogInSuccess] = useState('')
  const [logInError, setLogInError] = useState('')

  const location = useLocation();
  const previousUrl = location.state?.from === '/login' || location.state?.from === '/signup' ? '/' : location.state?.from ?? '/';
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
    setUsernamecorrectError(false);

  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setPasswordcorrectError(false);

  };

  return (
    <>
      <Box className="login-container">
        <Box className="login-form-container">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              src={LOGO_API}
              alt="Godzilla logo"
              style={{
                width: "200px", // Set the width to your desired size
                height: "100px", // Set the height to "auto" to maintain aspect ratiomarginBottom: "20px" 
              }}
              align="center"
            />
          </div>
          {/* <Typography variant="h2" className="signup-heading" sx={{ color: 'primary.main' }}>
          Godzilla
        </Typography> */}
          <Typography variant="body1" align="center" color="primary">
            Log in to see posts from your friends.
          </Typography>
          <form onSubmit={(event) => LoginSubmit(event, username, password,
            setUsernameError, setPasswordError, setUsernamecorrectError, setPasswordcorrectError, setLogInSuccess, setLogInError,
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
          </form>
        </Box>
        <Box align="center" className="link-to-signup">
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Typography color="secondary">
              Don't have an account? Sign up
            </Typography>
          </Link>
        </Box>
      </Box>
      {
        !!logInSuccess && (
          <Notification
            status="success"
            content={logInSuccess}
            closeCallback={() => setLogInSuccess('')}
          />
        )
      }
      {
        !!logInError && (
          <Notification
            status="error"
            content={logInError}
            closeCallback={() => setLogInError('')}
          />
        )
      }
    </>
  );
}

export default LoginForm;