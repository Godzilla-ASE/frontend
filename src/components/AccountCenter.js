import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useHistory hook from react-router-dom
import UsernameSet from "./SignupComponents/UsernameSet";
import EmailSet from "./SignupComponents/EmailSet";
import PasswordSet from "./SignupComponents/PasswordSet";
import LocationSet from "./SignupComponents/LocationSet";
import LogoutButton from "./AccountCenter/LogoutButton";
import AccountCenterSubmit from "../services/AccountCenterSubmit";
import { AccountCenter_API } from "../services/APIs";
import "./SignupComponents/SignUp.css";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import useS3Upload from '../hooks/useS3Upload'
import Notification from "./Notification";

const AccountCenter = () => {

  const navigate = useNavigate();

  const user = JSON.parse(window.localStorage.getItem("user"));
  const token = window.localStorage.getItem("authToken");
  const id = window.localStorage.getItem("id")
  //console.log(user)
  //console.log(user.username)

  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState(user ? user.location : "");
  const [avatarUrl, setAvatarUrl] = useState(user ? user.avatarUrl : "");


  const [usernameError, setUsernameError] = useState(false);
  const [usernameexistError, setUsernameexistError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const [accountSuccess, setAccountSuccess] = useState('')
  const [accountError, setAccountError] = useState('')

  const [selectedDate, setSelectedDate] = useState(user && user.birthday ? dayjs(user.birthday) : dayjs("1900-01-01"));

  const [dateChanged, setDateChanged] = useState(false);
  const [usernameChanged, setUsernameChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [locationChanged, setLocationChanged] = useState(false);
  const [avatarChanged, setAvatarChanged] = useState(false);

  const { uploadImageToS3 } = useS3Upload();

  const handleDateChange = (newselectedDate) => {
    setSelectedDate(newselectedDate);

    setDateChanged(true);
  };


  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const URL = await uploadImageToS3(file);
    //console.log(URL)
    setAvatarUrl(URL);
    setAvatarChanged(true);
  };

  return (
    <>
      <Box
        className="signup-container"
      >
        <Box
          className="signup-form-container"
        >
          <Typography variant="h2" align="center" color="primary">
            Account Center
          </Typography>
          <form
            onSubmit={(event) => AccountCenterSubmit(event, username, password, email, location, confirmPassword,
              usernameError, emailError, passwordError, confirmPasswordError, locationError,
              setUsernameError, setPasswordError, setConfirmPasswordError, setLocationError, setEmailError,
              setUsernameexistError, setAccountSuccess, setAccountError, AccountCenter_API, navigate,
              selectedDate, dateChanged, usernameChanged, emailChanged, passwordChanged, locationChanged,
              avatarUrl, avatarChanged, token, id)}
            className="signup-form"
          >
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <Avatar alt={username} src={avatarUrl} sx={{ width: 56, height: 56, border: '2px solid #fff' }} />
                <label htmlFor="file-upload" style={{ display: 'inline-block', color: 'white', padding: '6px 12px', cursor: 'pointer' }}>
                  Change Avatar
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

            <LocalizationProvider
              dateAdapter={AdapterDayjs}
            >
              <DatePicker
                label="Birthday"
                defaultValue={dayjs("1900-01-01")}
                value={selectedDate}
                onChange={handleDateChange}
                format="YYYY-MM-DD"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                      borderWidth: "2px"
                    },
                  },
                  '.MuiFormLabel-root': {
                    color: "white",
                  },
                  '.MuiInputBase-root': {
                    color: 'white',
                  },
                  '.MuiSvgIcon-root': {
                    fill: 'white',
                  },
                }}
              />
            </LocalizationProvider>

            <Button variant="contained" color="primary" type="submit" className="signup-button">
              Update
            </Button>
            <LogoutButton
            />
          </form>
        </Box>
      </Box>
      {
        !!accountSuccess && (
          <Notification
            status="success"
            content={accountSuccess}
            closeCallback={() => setAccountSuccess('')}
          />
        )
      }
      {
        !!accountError && (
          <Notification
            status="error"
            content={accountError}
            closeCallback={() => setAccountError('')}
          />
        )
      }
    </>
  );
};

export default AccountCenter;