import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Link,
  Typography,
} from "@mui/material";
import GetPageStatus from "./GetPageStatus";
import UsernameSet from "./SignupComponents/UsernameSet";
import EmailSet from "./SignupComponents/EmailSet";
import PasswordSet from "./SignupComponents/PasswordSet";
import LocationSet from "./SignupComponents/LocationSet";
import SignupSubmit from "./Wrapper/SignupSubmit";
import "./SignupComponents/SignUp.css";

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
  const [pageStatus, setPageStatus] = useState("");
  

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
    setFullnameError(false);
    setPageStatus("");
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setIsCheckedError(false);
    setPageStatus("");
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
          onSubmit={(event) => SignupSubmit(event, username, password, email, location, confirmPassword, isChecked,
            usernameError, emailError, passwordError, confirmPasswordError, locationError, isCheckedError,
             setUsernameError, setPasswordError, setConfirmPasswordError, setLocationError, setEmailError,
              setUsernameexistError, setIsCheckedError, setPageStatus)}
          className="signup-form"
        >  
        <UsernameSet
            username={username}
            setUsername={setUsername}
            setUsernameError={setUsernameError}
            setUsernameexistError={setUsernameexistError}
            setPageStatus={setPageStatus}
            usernameError={usernameError}
            usernameexistError={usernameexistError}
          />
          <EmailSet
            email={email}
            emailError={emailError}
            setEmail={setEmail}
            setEmailError={setEmailError}
            setPageStatus={setPageStatus}
          />
          <PasswordSet
            password={password}
            passwordError={passwordError}
            confirmPassword={confirmPassword}
            confirmPasswordError={confirmPasswordError}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            setPasswordError={setPasswordError}
            setConfirmPasswordError={setConfirmPasswordError}
            setPageStatus={setPageStatus}
          />
          <LocationSet
            location={location}
            setLocation={setLocation}
            setLocationError={setLocationError}
            locationError={locationError}
            setPageStatus={setPageStatus}
          />
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
        <GetPageStatus 
          pageStatus={pageStatus} 
          />
        </form>
        <Typography variant="body2" color="textSecondary" className="signup-footer">
          By signing up, you agree to our Terms, Data Policy and Cookies Policy.
        </Typography>
      </Box>
    <Box className="signup-link-to-login">
        <Typography>
          Have an account? { }
        <Link href="./login" className="link-to-login" style={{color:"black"}}>
          Log in
        </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;