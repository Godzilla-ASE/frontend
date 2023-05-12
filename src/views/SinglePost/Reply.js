import React from "react";
import { CardContent, Typography, Button } from '@mui/material';
import AuthorInfoWrapper from "../../components/Wrapper/AuthorInfoWrapper";
import {deleteReply } from "../../services/comment";

function Replys({ reply, loginedUserID }) {
  const content = reply.content;

  return (
    <div>
      <AuthorInfoWrapper post={reply} styleSetting="start" />
      <CardContent style={{ marginLeft: '9%' }}>
        <Typography color="secondary" variant="body2" >
          {content}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {loginedUserID === reply.userid_from ? <Button style={{fontSize: '12px'}} onClick={()=>deleteReply(reply.replyId)}>Delete</Button>:<div></div> }
        </div>
      </CardContent>
    </div>
  )
}

export default Replys;