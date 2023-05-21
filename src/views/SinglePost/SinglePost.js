import React, { useState, useEffect } from "react";
import { Card, Grid } from "@mui/material";
import "./singlepost.css";
import { useParams } from "react-router-dom";
import { getOne } from "../../services/post";
import { getPostComments } from "../../services/comment";
import PicGallry from "./PicGallry";
import FollowWapper from "../../components/Wrapper/FollowWrapper";
import CommentFooter from "./CommentFooter";
import PostContent from "./PostContent";
import { useTheme } from "@mui/material/styles";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import AuthorInfoWrapper from "../../components/Wrapper/AuthorInfoWrapper";

function SinglePost() {
  const postId = useParams().postId;
  const loginedUser = useLoggedInUser();
  const [post, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyComment, setreplyComment] = useState([]);

  const handlereplyCommentChange = (newValue) => {
    setreplyComment(newValue);
  };
  const theme = useTheme();
  // load post data and comment from two API
  useEffect(() => {
    const fetchData = async () => {
      const postdata = await getOne(postId);
      const comments = await getPostComments(postId);
      setPostData(postdata);
      setComments(comments);
    }
    fetchData()
  }, [])

  if (!post) {
    return (
      <div
        style={{
          height: 829,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p> Loading post </p>
      </div>
    );
  }
  if (!comments) {
    return (
      <div
        style={{
          height: 829,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p> Loading comment </p>
      </div>
    );
  }

  const images = post.content_img.split(",");
  const AuthorID = post.userid;

  const loginedUserID = loginedUser == null ? null : loginedUser.id;
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Card
        className="post-card"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <PicGallry images={images} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <AuthorInfoWrapper post={post} />
              {AuthorID !== loginedUserID || loginedUserID === null ? (
                <FollowWapper loginUser={loginedUser} id={AuthorID} />
              ) : (
                <div></div>
              )}
            </div>

            <div
              style={{ marginTop: "20px", overflowY: "auto", gridRow: "2 / 3" }}
            >
              <PostContent
                post={post}
                comments={comments}
                loginedUserID={loginedUserID}
                onreplyCommentChange={handlereplyCommentChange}
              />
            </div>

            <br></br>
            <div style={{ borderTop: "1px solid grey" }}>
              <CommentFooter
                post={post}
                user={loginedUser}
                replyComment={replyComment}
              />
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default SinglePost;
