import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import UsernameSet from "./SignupComponents/UsernameSet";
import EmailSet from "./SignupComponents/EmailSet";
import PasswordSet from "./SignupComponents/PasswordSet";
import LocationSet from "./SignupComponents/LocationSet";
import SignupSubmit from "../services/SignupSubmit";
import { LOGO_API } from "../services/APIs";
import "./SignupComponents/SignUp.css";
import useS3Upload from '../hooks/useS3Upload'
import Notification from './Notification'

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [signUpSuccess, setSignUpSuccess] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState("https://robohash.org/31.10.156.227.png");
  const [pagehasError,setPageHasError] = useState(true);
  const [usernameexistError, setUsernameexistError] = useState(false);
  const [isCheckedError, setIsCheckedError] = useState(false);
  //store the status of each required field
  const [isFieldValid, setIsFieldValid] = useState({
    username: false,
    email: false,
    password: false,
    location: false,
    isChecked: false
  });
  let requestBody = {};

  useEffect(() => {
    // if all fields are filled as expected
    if (isFieldValid.username && isFieldValid.email && isFieldValid.password && isFieldValid.location && isFieldValid.isChecked) {
      setPageHasError(false);
      requestBody = {username, email, password, location, avatarUrl};
    }
    else{
      setPageHasError(true);
    }
  }, [isFieldValid]);

  const { uploadImageToS3 } = useS3Upload();

  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    //check whether the checkbox is clicked correctly
    if(event.target.checked){
      setIsCheckedError(false)
      setIsFieldValid((prevState) => ({
        ...prevState,
        isChecked: true
      }));
    }
    else{
      setIsCheckedError(true)
      setIsFieldValid((prevState) => ({
        ...prevState,
        isChecked: false
      }));
    }
  };

  const handleFileInputChange = async (event) => {
    //check whether user upload a new avatar
    const file = event.target.files[0];
    const URL = await uploadImageToS3(file);
    setAvatarUrl(URL);
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
        </div>
        <Typography variant="body1" align="center" color="primary">
          Sign up to see posts from your friends.
        </Typography>
        <form
          onSubmit={(event) => SignupSubmit(event, requestBody, pagehasError, setUsernameexistError,
            setSignUpSuccess, setSignUpError, navigate)}
          className="signup-form"
        >
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
              <Avatar alt={username} src={avatarUrl} sx={{ width: 56, height: 56, border: '2px solid #fff' }} />
              <label htmlFor="file-upload" style={{ display: 'inline-block', color: 'white', padding: '6px 12px', cursor: 'pointer' }}>
                Set Avatar
              </label>
              <input id="file-upload" type="file" accept="image/*" onChange={handleFileInputChange} style={{ display: 'none' }} />
            </div>
          </div>
          <UsernameSet
            username={username}
            setUsername={setUsername}
            setIsFieldValid={setIsFieldValid}
            usernameexistError={usernameexistError}
            setUsernameexistError={setUsernameexistError}
          />
          <EmailSet
            email={email}
            setEmail={setEmail}
            setIsFieldValid={setIsFieldValid}
          />
          <PasswordSet
            password={password}
            setPassword={setPassword}
            setIsFieldValid={setIsFieldValid}
          />
          <LocationSet
            location={location}
            setLocation={setLocation}
            setIsFieldValid={setIsFieldValid}
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