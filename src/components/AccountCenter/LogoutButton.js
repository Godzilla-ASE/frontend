import React from 'react';
import {
  Button,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

import Logout from '../../services/Logout'; // Import the Logout function from logout.js
import "../SignupComponents/SignUp.css";

const LogoutButton = ({ setPageStatus }) => {

  const navigate = useNavigate();

  return (
    <Button
      className="signup-button"
      variant="contained"
      color="error"
      onClick={(event) => Logout(setPageStatus, navigate)}>
      Logout
    </Button>
  );
};

export default LogoutButton;