import React from "react";
import Typography from "@mui/material/Typography";

function GetPageStatus({ pageStatus }){
  return (
    <Typography variant="body2" color="error">
      {pageStatus}
    </Typography>
  );
}

export default GetPageStatus;