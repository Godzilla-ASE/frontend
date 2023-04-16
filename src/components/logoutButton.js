import React from 'react';
import {
    Button,
  } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import Logout from '../services/Logout'; // Import the Logout function from logout.js

const LogoutButton = (setPageStatus) => {
  
    return (
      <button onClick={(event) => Logout(setPageStatus)}>
        Logout
      </button>
    );
  };
  
  export default LogoutButton;