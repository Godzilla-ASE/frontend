import React from "react";
import { Box } from "@mui/material";
import LoginForm from "./LoginComponents/LoginForm";
import "./LoginComponents/Login.css";
import {LOGO_API} from "../services/APIs";

function Login() {

  return (
    <Box className="Loginpage-container">
        <img
            src={LOGO_API}
            alt="Godzilla logo"
            style={{
                width: "200px",
                height: "100px",
            }}
            align="center"
        />
      <LoginForm />
    </Box>
  );
}

export default Login;