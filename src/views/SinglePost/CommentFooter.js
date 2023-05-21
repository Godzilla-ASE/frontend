import React, { useState } from "react";
import "./singlepost.css";
import { useNavigate, useParams } from "react-router-dom";
import ReactionWrapper from "../../components/Wrapper/ReactionWrapper";
import MultiLineInput from "../../components/Inputs/MultiLineInput";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { Button } from "@mui/material";
import { deletePost } from "../../services/post";
import { addComment, addReply } from "../../services/comment";
import Notification from "../../components/Notification";

const CommentFooter = ({ post, user, replyComment }) => {
  const [commentText, setCommentText] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const postId = useParams().postId;
  const logginedUserId = user != null ? user.id : 0;
  const postAuthorID = post.userid;

  const handleSubmit = () => {
    if (!user) {
      navigate("/login");
    }
    const Now = new Date();
    // if no commentText typed, then nothing happened
    if (commentText !== "") {
      if (replyComment.length !== 0) {
        const commentID = replyComment.id;
        addReply(logginedUserId, postAuthorID, commentID, commentText, Now);
        setCommentText("");
        setMessage(`Successfully replied to ${commentID}`);
        navigate(`/post/${postId}`);
      } else {
        addComment(logginedUserId, postId, commentText, Now);
        setCommentText("");
        setMessage(`Successfully commented the post ${postId} `);
        navigate(`/post/${postId}`);
      }
    }
  };

  const handlePostDelete = (postid) => {
    deletePost(postid);
    setTimeout(() => {
      navigate("/");
    }, 1000);
    setMessage(`Successfully deleted the post ${postid}`);
  };

  let placeholdertext = "Write your comments...";
  let buttontext = "Comment";
  // change the context accroding to status
  if (replyComment.length !== 0) {
    placeholdertext = "Reply to " + replyComment.username;
    buttontext = "Reply";
  }

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          <ReactionWrapper post={post} logginedUser={user} />
          {postAuthorID === logginedUserId ? (
            <Button
              style={{ color: "#dd0000" }}
              onClick={() => handlePostDelete(postId)}
            >
              Delete Post
            </Button>
          ) : (
            <div></div>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <MultiLineInput
            placeholder={placeholdertext}
            value={commentText}
            handleChange={(e) => {
              setCommentText(e.target.value);
            }}
          />
          <SubmitButton buttontext={buttontext} onClick={handleSubmit} />
        </div>
      </div>
      {!!message && (
        <Notification
          status="success"
          content={message}
          closeCallback={() => setMessage("")}
        />
      )}
    </>
  );
};

export default CommentFooter;
