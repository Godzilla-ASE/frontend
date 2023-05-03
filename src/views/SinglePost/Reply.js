import React from "react";
import { CardContent, Typography, Button } from '@mui/material';
import AuthorInfoWrapper from "../../components/Wrapper/AuthorInfoWrapper";
import { deleteComment, deleteReply } from "../../services/comment";

function Replys({ reply, loginedUserID }) {
  const content = reply.content;
  const date = reply.creation_date;

  console.log(loginedUserID, reply.userid_from);
  console.log(loginedUserID === reply.userid_from);
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {loginedUserID === reply.userid_from ? <Button onClick={deleteReply(reply.ID)}>Delete</Button>:<div></div> }
        </div>
      </CardContent>
    </div>
  )
}

export default Replys;