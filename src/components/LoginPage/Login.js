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
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernamecorrectError, setUsernamecorrectError] = useState(false);
  const [passwordcorrectError, setPasswordcorrectError] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (username && password) {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
          const authToken = await response.text();
          // save user to localStorage
          // localStorage.setItem("loggedInUser", user);
          setLoginStatus(`Logged in successfully. Auth Token: ${authToken}`);
        } else if (response.status === 404) {
          const error = await response.text();
          setUsernamecorrectError(true);
          setLoginStatus(`Username not found. Error: ${error}`);
        } else if (response.status === 409) {
          const error = await response.text();
          setPasswordcorrectError(true);
          setLoginStatus(`Wrong credentials. Error: ${error}`);
        }
      } catch (error) {
        console.error(error);
        setLoginStatus("Failed to log in.");
      }
    }
  };

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
    <Box
      className="login-container"
    >
      <Box
        className="login-form-container"
      >
        <img
          src=""
          alt="Godzilla logo"
          style={{ marginBottom: "20px" }}
          align="center"
        />
        <form
          onSubmit={handleSubmit}
          className="signup-form"
        >
          <FormControl variant="outlined" className="login-input">
            <InputLabel htmlFor="username-input">Username</InputLabel>
            <OutlinedInput
              id="username-input"
              type="username"
              value={username}
              onChange={handleUsernameChange}
              label="username"
              error={usernameError && usernamecorrectError}
            />
            {usernameError && <FormHelperText sx={{ color: 'red' }}>Please enter your username.</FormHelperText>}
            {usernamecorrectError && <FormHelperText sx={{ color: 'red' }}>Please enter correct username.</FormHelperText>}
          </FormControl>
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
                  <Link href="/" color="primary" size="small" className="login-forgot-button">
                    Forgot?
                  </Link>
                </InputAdornment>
              }
            />
            {passwordError && <FormHelperText sx={{ color: 'red' }}>Please enter your password.</FormHelperText>}
            {passwordcorrectError && <FormHelperText sx={{ color: 'red' }}>Please enter correct password.</FormHelperText>}
          </FormControl>
          <Button variant="contained" color="primary" type="submit" className="login-button">
            Log In
          </Button>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
            sx={{ marginBottom: "16px" }}
          />
          {loginStatus && (
            <Typography variant="body2" color="error">
              {loginStatus}
            </Typography>
          )}
        </form>
      </Box>
      <Box align="center" className="link-to-signup">
        <Typography variant="body3">
          Don't have an account?{" "}
          <Link href="/signup" variant="body3">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;