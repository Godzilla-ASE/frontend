import React from "react";
import { Box } from "@mui/material";
import LoginForm from "./LoginComponents/LoginForm";
import "./LoginComponents/Login.css";

function Login() {

  return (
    <Box className="Loginpage-container">
      <LoginForm />
    </Box>
  );
};

export default Login;