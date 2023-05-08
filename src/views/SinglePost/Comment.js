import React from "react";
import { CardContent, Typography, Button } from '@mui/material';
import Reply from "./Reply";
import AuthorInfoWrapper from "../../components/Wrapper/AuthorInfoWrapper";
import { deleteComment } from "../../services/comment";

function Comment({ comment, loginedUserID, onreplyCommentChange }) {
  const content = comment.content;
  const replys = comment.reply;

  const creation_date = comment.creation_date;
  
  const timestamp = Date.parse(creation_date);
  const creation_date_ = new Date(timestamp);
  const year = new Date(creation_date_).getFullYear();
  const month = new Date(creation_date_).getMonth() + 1;
  const day = new Date(creation_date_).getDate();
  const date = year+"-"+month+"-"+day;

  const handleReply = ()=>{
    onreplyCommentChange(comment);
  }
  const handleDeleteComment = (id)=>{
    deleteComment(id);
  }

  if (replys.length !== 0) {
    //console.log(loginedUserID, comment.userid)
    return (
      <div>
        <AuthorInfoWrapper post={comment} styleSetting="start" />
        <CardContent style={{ marginLeft: '9%' }}>
          <Typography color="secondary" variant="body2" >
            {content}
          </Typography>
          <Typography variant="body3" color="secondary">
            {creation_date ? date : <div></div>}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {loginedUserID !== comment.userid ? <div></div> : <Button onClick={()=>handleDeleteComment(comment.id)}>Delete</Button>}
            <Button onClick={()=>handleReply()}>
              Reply
            </Button>
          </div><br></br>
          <div>
            {replys.map((reply) => (
              <Reply reply={reply} loginedUserID={loginedUserID} />
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
        <AuthorInfoWrapper post={comment} styleSetting="start" />
        <CardContent style={{ marginLeft: '10%' }}>
        <Typography color="secondary" variant="body2" >
            {content}
          </Typography>
          <Typography variant="body3" color="secondary">
          {creation_date ? date : <div></div>}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {loginedUserID !== comment.userid ? <div></div> : <Button onClick={()=>handleDeleteComment(comment.id)}>Delete</Button>}
            <Button onClick={()=>handleReply()}>
              Reply
            </Button>
          </div>
        </CardContent>
      </div>
    );
  }

}

export default Comment;