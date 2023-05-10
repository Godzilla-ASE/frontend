import React from "react";
import { Box } from "@mui/material";
import LoginForm from "./LoginComponents/LoginForm";
import { LOGO_API } from "../services/APIs";
import "./LoginComponents/Login.css";

function Login() {

  return (
    <Box className="Loginpage-container">
      {/* <img
          src={LOGO_API}
          alt="Godzilla logo"
          style={{ width: "300px", // Set the width to your desired size
          height: "200px", // Set the height to "auto" to maintain aspect ratiomarginBottom: "20px" 
        }}
          align="center"
      /> */}
      <LoginForm />
    </Box>
  );
};

export default Login;