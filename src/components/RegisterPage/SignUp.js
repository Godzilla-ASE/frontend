import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [location, setLocation] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [usernameexistError, setUsernameexistError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [fullnameError, setFullnameError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [isCheckedError, setIsCheckedError] = useState(false);
  const [signupStatus, setSignUpStatus] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
    setUsernameexistError(false);
    setSignUpStatus("");
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
    setSignUpStatus("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setSignUpStatus("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(false);
    setSignUpStatus("");
  };

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
    setFullnameError(false);
    setSignUpStatus("");
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setLocationError(false);
    setSignUpStatus("");
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setIsCheckedError(false);
    setSignUpStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!/^[a-zA-Z0-9]{6,16}$/.test(username)) {
      // username.length < 6 || username.length > 16 || 
      setUsernameError(true);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[,.?!@#$%^&+-_=*]).{8,16}$/.test(password)) {
      // password.length < 8 || password.length > 16 || 
      setPasswordError(true);
    }
    if (!(password === confirmPassword)) {
      setConfirmPasswordError(true);
    }
    // if (!(fullname.length > 0)) {
    //   setFullNameError(true);
    // }
    if (location === "") {
      setLocationError(true);
    }
    if (!isChecked) {
      setIsCheckedError(true);
    }
    if (!(usernameError || emailError || passwordError || confirmPasswordError || locationError || isCheckedError)) { // fullnameError
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, location }),
        });
        console.log(response);
        if (response.ok) {
          //const result = await response.text();
          setSignUpStatus(`Sign up successfully.`);
        } else if (response.status === 409) {
          const error = await response.text();
          setUsernameexistError(true);
          setSignUpStatus(`Username Exists. Error: ${error}`);
        }
      } catch (error) {
        console.error(error);
        setSignUpStatus("Failed to sign up.");
      }
    }
  };

  return (
    <Box
      className="signup-container"
    >
      <Box
        className="signup-form-container"
      >
        <Typography variant="h4" className="signup-heading">
          Godzilla
        </Typography>
        <Typography  align="center">
          Sign up to see posts from your friends.
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="signup-form"
        >
          <FormControl variant="outlined" className="signup-input">
            <InputLabel htmlFor="username-input">Username</InputLabel>
            <OutlinedInput
              id="username-input"
              type="username"
              value={username}
              onChange={handleUsernameChange}
              label="username"
              error={usernameError || usernameexistError}
            />
            {
            <FormHelperText sx={{color: usernameError ? 'red' : 'inherit'}}>
              Must be between 6 and 16 characters, alphanumeric only
              </FormHelperText>}
            {usernameexistError &&
            <FormHelperText sx={{  color: 'red' }}>
              Username exists, please try another 
              </FormHelperText>}
          </FormControl>
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
          <FormControl variant="outlined" className="signup-input">
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <OutlinedInput
              id="password-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              label="Password"
              error={passwordError}
              // endAdornment={
              //   <InputAdornment position="end">
              //     <Button color="primary" size="small" className="signup-forgot-button">
              //       Forgot?
              //     </Button>
              //   </InputAdornment>
              // }
            />
            { 
            <FormHelperText sx={{color: passwordError ? 'red' : 'inherit'}}>
              Must be between 8 and 16 characters, contain at least
              one uppercase letter, one lowercase letter, one number and one
              special character.
              </FormHelperText>}
            {/* {!passwordError &&
            <FormHelperText id="password-helper-text">
                Must be between 8 and 16 characters, contain at least
                one uppercase letter, one lowercase letter, one number and one
                special character.
            </FormHelperText>} */}
          </FormControl>
          <FormControl variant="outlined" className="signup-input">
            <InputLabel htmlFor="confirm-password-input">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirm-password-input"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              label="Confirm Password"
              error={confirmPasswordError}
            />
            {confirmPasswordError &&
            <FormHelperText sx={{  color: 'red' }}>
              Please type in the same password
              </FormHelperText>}
          </FormControl>
          {/* <FormControl variant="outlined" className="signup-input">
            <InputLabel htmlFor="fullname-input">Full Name</InputLabel>
            <OutlinedInput
              id="fullname-input"
              type="fullname"
              value={fullname}
              onChange={handleFullnameChange}
              label="fullname"
                            error={fullNameError}
            />
          </FormControl> */}
          <FormControl variant="outlined" className="signup-input">
          <InputLabel htmlFor="location-select">Location</InputLabel>
          <Select
            labelId="location-select"
            id="location-select"
            value={location}
            onChange={handleLocationChange}
            label="Location"
            error={locationError}
          >
            <MenuItem value="Zurich">Zurich</MenuItem>
            <MenuItem value="Bern">Bern</MenuItem>
            <MenuItem value="Geneva">Geneva</MenuItem>
            <MenuItem value="Lucerne">Lucerne</MenuItem>
            <MenuItem value="St. Gallen">St. Gallen</MenuItem>
          </Select>
          {locationError &&
            <FormHelperText sx={{  color: 'red' }}>
              Please select your location
              </FormHelperText>}
          </FormControl>
          {/* <FormControl variant="outlined" className="signup-input">
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <OutlinedInput
              id="email-input"
              type="email"
              value={email}
              onChange={handleEmailChange}
              label="Email"
            />
          </FormControl> */}
          <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
            label="I agree to the policy, terms and conditions"
            className="signup-checkbox"
            error={isCheckedError}
          />
          {isCheckedError &&
            <FormHelperText sx={{  color: 'red' }}>
              You should agree to our policy, terms and conditions. 
              </FormHelperText>}
          <Button variant="contained" color="primary" type="submit" className="signup-button">
            Sign up
          </Button>
          {signupStatus && (
            <Typography variant="body2" color="error">
              {signupStatus}
            </Typography>
          )} 
        </form>
        <Typography variant="body2" color="textSecondary" className="signup-footer">
          By signing up, you agree to our Terms, Data Policy and Cookies Policy.
        </Typography>
      </Box>
    {/* <Box
    className="back-to-login-container"
    >
        
    </Box> */}
    <Box className="signup-link-to-login">
        <Typography>
          Have an account? { }
        <Link href="./login" className="link-to-login">
          Log in
        </Link>
        </Typography>
      </Box>
    {/* <div className="signup-login-box">
        <div className="signup-login">
          Have an account?{' '}
          <a href="/login" className="signup-login-link">
            Log in
          </a>
        </div>
      </div> */}
    </Box>
  );
};

export default SignUp;