import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Typography,
} from "@mui/material";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import UsernameSet from "./SignupComponents/UsernameSet";
import EmailSet from "./SignupComponents/EmailSet";
import PasswordSet from "./SignupComponents/PasswordSet";
import LocationSet from "./SignupComponents/LocationSet";
import SignupSubmit from "../services/SignupSubmit";
import { SIGNUP_API, LOGO_API } from "../services/APIs";
import "./SignupComponents/SignUp.css";
import useS3Upload from '../Hooks/useS3Upload'
import Notification from './Notification'

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
  const [signUpSuccess, setSignUpSuccess] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState("https://robohash.org/31.10.156.227.png");

  const [usernameChanged, setUsernameChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [locationChanged, setLocationChanged] = useState(false);
  const [avatarChanged, setAvatarChanged] = useState(false);

  const { uploadImageToS3 } = useS3Upload();

  const navigate = useNavigate();

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
    setFullnameError(false);

  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setIsCheckedError(false);

  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const URL = await uploadImageToS3(file);
    //console.log(URL)
    setAvatarUrl(URL);
    setAvatarChanged(true);
  };

  return (
    <Box
      className="signup-container"
    >
      <Box
        className="signup-form-container"
      >
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
        </div>{/* <Typography variant="h2" className="signup-heading" sx={{ color: 'primary.main' }}>
          Godzilla
        </Typography> */}
        <Typography variant="body1" align="center" color="primary">
          Sign up to see posts from your friends.
        </Typography>
        <form
          onSubmit={(event) => SignupSubmit(event, username, password, email, location, confirmPassword, isChecked,
            usernameError, emailError, passwordError, confirmPasswordError, locationError, isCheckedError,
            setUsernameError, setPasswordError, setConfirmPasswordError, setLocationError, setEmailError,
            setUsernameexistError, setIsCheckedError, setSignUpSuccess, setSignUpError, avatarUrl, avatarChanged, SIGNUP_API, navigate)}
          className="signup-form"
        >
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
              <Avatar alt={username} src={avatarUrl} sx={{ width: 56, height: 56, border: '2px solid #fff' }} />
              <label htmlFor="file-upload" style={{ display: 'inline-block', color: 'white', padding: '6px 12px', cursor: 'pointer' }}>
                Set Avatar
              </label>
              <input id="file-upload" type="file" accept="image/*" onChange={handleFileInputChange} style={{ display: 'none' }} />
              {/* <input type="file" accept="image/*" onChange={handleFileInputChange} /> */}
            </div>
          </div>
          <UsernameSet
            username={username}
            setUsername={setUsername}
            setUsernameError={setUsernameError}
            setUsernameexistError={setUsernameexistError}

            usernameError={usernameError}
            usernameexistError={usernameexistError}
            setUsernameChanged={setUsernameChanged}
          />
          <EmailSet
            email={email}
            emailError={emailError}
            setEmail={setEmail}
            setEmailError={setEmailError}

            setEmailChanged={setEmailChanged}
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

            setPasswordChanged={setPasswordChanged}
          />
          <LocationSet
            location={location}
            setLocation={setLocation}
            setLocationError={setLocationError}
            locationError={locationError}
            setLocationChanged={setLocationChanged}
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={isChecked} onChange={handleCheckboxChange} />}
            label="I agree to the policy, terms and conditions"
            className="signup-checkbox"
            sx={{ fontSize: 'body2.fontSize', color: 'secondary.main' }}
            error={isCheckedError}
          />
          {isCheckedError &&
            <FormHelperText sx={{ fontSize: 'body2.fontSize', color: 'red' }}>
              You should agree to our policy, terms and conditions.
            </FormHelperText>}
          <Button variant="contained" color="primary" type="submit" className="signup-button">
            Sign up
          </Button>
          {
            !!signUpSuccess && (
              <Notification
                status="success"
                content={signUpSuccess}
                closeCallback={() => setSignUpSuccess('')}
              />
            )
          }
          {
            !!signUpError && (
              <Notification
                status="error"
                content={signUpError}
                closeCallback={() => setSignUpError('')}
              />
            )
          }
        </form>
        {/* <Typography variant="body2" color="secondary" className="signup-footer">
          By signing up, you agree to our Terms, Data Policy and Cookies Policy.
        </Typography> */}
      </Box>
      <Box className="signup-link-to-login">
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Typography color="secondary">
            Have an account? Log in.
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default SignUp;