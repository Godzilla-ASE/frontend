import React from "react";
import Typography from "@mui/material/Typography";

function GetPageStatus({ pageStatus }){
  return (
    <Typography variant="body1" color="error">
      {pageStatus}
    </Typography>
  );
}

export default GetPageStatus;