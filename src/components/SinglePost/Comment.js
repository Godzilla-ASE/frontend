import React from "react";
import { Card, CardActions, IconButton, CardHeader, CardContent, Avatar, Grid, Typography, Button } from '@mui/material';
import ReplyIcon from "@mui/icons-material/Reply";
import Reply from "./Reply";
import AuthorInfoWrapper from "../Wrapper/AuthorInfoWrapper";
import { AiOutlineFontSize } from "react-icons/ai";

function Comment({ comment, onreplyCommentChange }) {
  const content = comment.content;
  const date = comment.creation_date;
  const replys = comment.reply;

  const handleReply = ()=>{
    onreplyCommentChange(comment);
  }

  if (replys.length !== 0) {
    return (
      <div>
        <AuthorInfoWrapper post={comment} />
        <CardContent style={{ marginLeft: '9%' }}>
          <Typography color="secondary" variant="body2" >
            {content}
          </Typography>
          <Typography variant="body3" color="secondary">
            {date} Zurich
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleReply}>
              Reply
            </Button>
          </div><br></br>
          <div>
            {replys.map((reply) => (
              <Reply reply={reply} />
            ))}
          </div>
        </CardContent>
      </div>
    );
  }
  else {
    return (
      <div>
        <div style={{ borderTop: '1px solid #ccc', width: '70%', marginLeft: "15%" }}></div>
        <AuthorInfoWrapper post={comment} />
        <CardContent style={{ marginLeft: '10%' }}>
        <Typography color="secondary" variant="body2" >
            {content}
          </Typography>
          <Typography variant="body3" color="secondary">
            {date} Zurich
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleReply}>
              Reply
            </Button>
          </div>
        </CardContent>
      </div>
    );
  }

}

export default Comment;