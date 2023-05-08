import React, { useState, useEffect } from 'react';
import { Card, Grid } from '@mui/material';
import './singlepost.css';
import { useParams } from 'react-router-dom';
import { getOne } from '../../services/post';
import { getPostComments } from '../../services/comment';
import PicGallry from './PicGallry';
import FollowWapper from '../../components/Wrapper/FollowWrapper'
import CommentFooter from './CommentFooter';
import PostContent from './PostContent';
import { useTheme } from '@mui/material/styles';
import UserInfoWrapper from '../../components/Wrapper/UserInfoWrapper';
import useLoggedInUser from "../../hooks/useLoggedInUser";


function SinglePost() {

  const postId = useParams().postId;
  const loginedUser = useLoggedInUser();
  const [post, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyComment, setreplyComment] = useState([]);
  //console.log(loginedUser);


  const handlereplyCommentChange = (newValue) => {
    setreplyComment(newValue);
  };
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const postdata = await getOne(postId);
      const comments = await getPostComments(postId);
      setPostData(postdata);
      setComments(comments);
    }
    fetchData()
  }, [])
  //console.log(post);
  
  if (!post) {
    return (
      <div style={{ height: 829, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p> Loading post </p>
      </div>
    )
  }
  if (!comments) {
    return (
      <div style={{ height: 829, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p> Loading comment </p>
      </div>
    )
  }

  const images = post.content_img.split(",");
  const AuthorID = post.userid;

  //console.log("siglepost：post",post);
  const loginedUserID = loginedUser == null ? null : loginedUser.userID;
  return (
    //结构是这样的
    //Card（整个post就是一个卡片）
    //｜- Grid container（格子组件，分成左右两个）
    //  ｜-- Grid （左格子）
    //      ｜-- PicGallry (放相册的)
    //  ｜-- Grid （右格子）
    //      ｜-- CardHeader (最上面的用户信息栏)
    //      ｜-- CardContent 
    //          ｜-- PostContent（这篇post的内容）
    //              |-- <div> (这里面的内容可以上下滑动)
    //                  |-- Typography 
    //                  |-- Typography
    //                  |-- Typography (几个并排的文字信息：时间，标题，帖子内容)
    //                  |-- CommentsBox (用来放这篇帖子的n条评论)
    //                      |-- Comments 1
    //                          |-- Reply 1.1
    //                          ...
    //                      |-- Comments 2
    //                          |-- Reply 2.1
    //                          ...
    //                      ...
    //              |-- </div> (这里面的内容可以上下滑动)
    //          ｜-- CommentFooter (点赞、点踩、分享、回复等操作)

    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.palette.background.default }} >
      <Card className="post-card" style={{ backgroundColor: theme.palette.background.default }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <PicGallry images={images} />
          </Grid>
          <Grid item xs={12} sm={6} style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' }}>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
              <UserInfoWrapper userID={AuthorID} />
              {AuthorID !== loginedUserID || loginedUserID === null ?
                <FollowWapper loginUser={loginedUser} userID={AuthorID} /> : <div></div>}
            </div>

            <div style={{ marginTop: '20px', overflowY: 'auto', gridRow: '2 / 3' }}>
              <PostContent post={post} comments={comments} loginedUserID={loginedUserID} onreplyCommentChange={handlereplyCommentChange} />
            </div>

            <br></br>
            <div style={{ borderTop: '1px solid grey' }}>
              <CommentFooter post={post} user={loginedUser} replyComment={replyComment} />
            </div>
          </Grid>

        </Grid>

      </Card>
    </div>
  );
}

export default SinglePost;
