import {Typography} from '@mui/material';
import React from "react";
import Comment from "./Comment";

const CommentsBox = ({comments, loginedUserID, onreplyCommentChange}) => {

  const commentsList = comments;

  if (commentsList.length === 0) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="body2" color="white" style={{padding: '10px'}}>
          No comment so far
        </Typography>
      </div>
    )
  } else {
    return (
      <div>
        {commentsList.map((comment) => (
          <Comment key={comment} comment={comment} loginedUserID={loginedUserID}
                   onreplyCommentChange={onreplyCommentChange}/>
        ))}
      </div>
    )
  }
}
export default CommentsBox