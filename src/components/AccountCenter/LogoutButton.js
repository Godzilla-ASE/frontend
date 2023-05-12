import React, { useState } from 'react';
import {
  Button,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

import Logout from '../../services/Logout';
import "../SignupComponents/SignUp.css";
import Notification from "../Notification"

const LogoutButton = () => {
  const [logOutSuccess, setLogOutSuccess] = useState('')
  const [logOutError, setLogOutError] = useState('')

  const navigate = useNavigate();

  return (
    <>
      <Button
        className="signup-button"
        variant="contained"
        color="error"
        onClick={(event) => Logout(navigate, setLogOutSuccess, setLogOutError)}>
        Logout
      </Button>
      {
        !!logOutSuccess && (
          <Notification
            status="success"
            content="Log in successfully!"
            closeCallback={() => setLogOutSuccess('')}
          />
        )
      }
      {
        !!logOutError && (
          <Notification
            status="error"
            content={logOutError}
            closeCallback={() => setLogOutError('')}
          />
        )
      }
    </>
  );
};

export default LogoutButton;