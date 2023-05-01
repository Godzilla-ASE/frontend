import React from "react";
import { CardContent, Typography } from '@mui/material';
import AuthorInfoWrapper from "../Wrapper/AuthorInfoWrapper";

function Replys({ reply }) {
  const content = reply.content;
  const date = reply.creation_date;

  return (
    <div>
      <AuthorInfoWrapper post={reply} />
      <CardContent style={{ marginLeft: '9%' }}>
        <Typography color="secondary" variant="body2" >
          {content}
        </Typography>
        <Typography variant="body3" color="secondary">
          {date}
        </Typography>
      </CardContent>
    </div>
  )
}

export default Replys;