import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import LoginSubmit from "../../services/LoginSubmit";
import { LOGO_API } from "../../services/APIs";
import "./Login.css"
import Notification from "../Notification";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernamecorrectError, setUsernamecorrectError] = useState(false);
  const [passwordcorrectError, setPasswordcorrectError] = useState(false);

  const [logInSuccess, setLogInSuccess] = useState('')
  const [logInError, setLogInError] = useState('')

  const location = useLocation();
  const previousUrl = location.state?.from === '/login' || location.state?.from === '/signup' ? '/' : location.state?.from ?? '/';
  const navigate = useNavigate();

  let requestbody = {}
  let functionbody = {}

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
          <Typography variant="body1" align="center" color="primary">
            Log in to see posts from your friends.
          </Typography>
          <form onSubmit={(event) => {
            requestbody={username, password}
            functionbody={setUsernamecorrectError, setPasswordcorrectError}
            try {
              await LoginSubmit(event, requestbody, previousUrl,navigate,functionbody, setLogInSuccess, setLogInError);
            } catch (error) {
              // Handle the error or provide appropriate feedback
              console.log(error)
            }
            }} className="login-form">
            <UsernameInput
              username={username}
              setUsername={setUsername}
              usernamecorrectError={usernamecorrectError}
              setUsernamecorrectError={setUsernamecorrectError}
            />
            <PasswordInput
              password={password}
              setPassword={setPassword}
              passwordcorrectError={passwordcorrectError}
              setPasswordcorrectError={setPasswordcorrectError}
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