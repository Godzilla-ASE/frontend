import React from "react";
import { CardContent, Typography, Button } from "@mui/material";
import Reply from "./Reply";
import AuthorInfoWrapper from "../../components/Wrapper/AuthorInfoWrapper";
import { deleteComment } from "../../services/comment";

function Comment({ comment, loginedUserID, onreplyCommentChange }) {
  const content = comment.content;
  const replys = comment.reply;

  const creation_date = comment.creation_date.slice(0, 10);

  const handleReply = () => {
    onreplyCommentChange(comment);
  };
  const handleDeleteComment = (id) => {
    deleteComment(id);
  }

  // comment without replys
  if (replys.length !== 0) {
    return (
      <div>
        <AuthorInfoWrapper post={comment} styleSetting="start" />
        <CardContent style={{ marginLeft: "9%" }}>
          <Typography color="secondary" variant="body2">
            {content}
          </Typography>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {loginedUserID !== comment.userid ? (
              <div></div>
            ) : (
              <Button onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </Button>
            )}
            <Button onClick={() => handleReply()}>Reply</Button>
          </div>
          <br></br>
          <div>
            {replys.map((reply) => (
              <Reply reply={reply} loginedUserID={loginedUserID} />
            ))}
          </div>
        </CardContent>
      </div>
    );
  } else {
    return (
      <div>
        <div
          style={{
            borderTop: "1px solid #ccc",
            width: "70%",
            marginLeft: "15%",
          }}
        ></div>
        <AuthorInfoWrapper post={comment} styleSetting="start" />
        <CardContent style={{ marginLeft: "10%" }}>
          <Typography color="secondary" variant="body2">
            {content}
          </Typography>
          <Typography variant="body3" color="secondary">
            {creation_date ? creation_date : <div></div>}
          </Typography>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {loginedUserID !== comment.userid ? (
              <div></div>
            ) : (
              <Button
                style={{ fontSize: "12px" }}
                onClick={() => handleDeleteComment(comment.id)}
              >
                Delete
              </Button>
            )}
            <Button style={{ fontSize: "12px" }} onClick={() => handleReply()}>
              Reply
            </Button>
          </div>
        </CardContent>
      </div>
    );
  }
}

export default Comment;
