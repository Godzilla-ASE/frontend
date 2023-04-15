import React from "react";
import Typography from "@mui/material/Typography";

function LoginStatus({ loginStatus }) {
  return (
    <Typography variant="body2" color="error">
      {loginStatus}
    </Typography>
  );
}

export default LoginStatus;