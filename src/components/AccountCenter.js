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
import "./SignupComponents/SignUp.css";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import useS3Upload from '../Hooks/useS3Upload'
import Notification from "./Notification";

const AccountCenter = () => {

  const navigate = useNavigate();

  const user = JSON.parse(window.localStorage.getItem("user"));
  const token = window.localStorage.getItem("authToken");
  const id = window.localStorage.getItem("id")

  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(user ? user.location : "");
  const [avatarUrl, setAvatarUrl] = useState(user ? user.avatarUrl : "");


  const [usernameexistError, setUsernameexistError] = useState(false);

  const [accountSuccess, setAccountSuccess] = useState('')
  const [accountError, setAccountError] = useState('')

  const [selectedDate, setSelectedDate] = useState(user && user.birthday ? dayjs(user.birthday) : dayjs("1900-01-01"));
  //store which field is changed and whether it is correct
  const [isFieldValid, setIsFieldValid] = useState({
    avatar: false,
    username: false,
    email: false,
    password: false,
    location: false,
    birthday: false
  });
  let requestBody = {};
  let accdetail = {id,token};

  const { uploadImageToS3 } = useS3Upload();

  const handleDateChange = (newselectedDate) => {
    setSelectedDate(newselectedDate);
    //if the new selected date not null
    if(newselectedDate !== null && newselectedDate !=="M"){
      setIsFieldValid((prevState) => ({
        ...prevState,
        birthday: true
      }));
    }
    else{
      setIsFieldValid((prevState) => ({
        ...prevState,
        birthday: false
      }));
    }
  };

  const handlerequestbodychange = async (event) => {
    //only change the field where changes
    if(isFieldValid.username){
      requestBody.username = username
    }
    if(isFieldValid.avatar){
      requestBody.avatarUrl = avatarUrl
    }
    if(isFieldValid.email){
      requestBody.email = email
    }
    if(isFieldValid.password){
      requestBody.password = password
    }
    if(isFieldValid.location && location !== null && location !== ""){
      requestBody.location = location
    }
    if(isFieldValid.birthday){
      requestBody.birthday = selectedDate
    }
  }


  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const URL = await uploadImageToS3(file);
    //console.log(URL)
    setAvatarUrl(URL);
    //the avatar is changed
    setIsFieldValid((prevState) => ({
      ...prevState,
      avatarUrl: true
    }));
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
            onSubmit={(event) => {
              handlerequestbodychange()
              AccountCenterSubmit(event, requestBody, accdetail,
                setUsernameexistError, setAccountSuccess, setAccountError, 
                navigate)}}
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