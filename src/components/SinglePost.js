import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Avatar, Grid } from '@mui/material';
import './SinglePost/singlepost.css';
import { useParams } from 'react-router-dom';
import { getOne } from '../services/post';
import { getPostComments } from '../services/comment';
import PicGallry from './SinglePost/PicGallry';
import FollowWapper from './Wrapper/FollowWrapper';
import CommentFooter from './SinglePost/CommentFooter';
import PostContent from './SinglePost/PostContent';
import { useTheme } from '@mui/material/styles';
import UserInfoWrapper from './Wrapper/UserInfoWrapper';


function SinglePost() {

  const postId = useParams().postId;
  const user = useParams().UserID;
  const [post, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const theme = useTheme()

  //测试数据
  useEffect(() => {
    const fetchData = async () => {
      const post = await getOne(postId);
      // 暂时用GetAll得到的数据做测试，因为还没有测试数据。假装postTitle就是内容，reply也先写死了
      const comments = await getPostComments(postId);
      setPostData(post);
      setComments(comments);
    }
    fetchData()
    //check if any user logged in
    // const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON)
    //   setUserLogIn(user)
    //   // blogService.setToken(user.token)
    // }
  }, [])

  if (!post) {
    return (
      <pre>Loading...</pre>
    )
  }
  if (!comments) {
    return (
      <pre>Loading...</pre>
    )
  }
  // console.log(post);
  // console.log(comments);

  const images = post.content_img.split(",");
  const username = post.username != null ? post.username : "NULL Username";

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
        {/* <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
          <PicGallry images={images} style==/>
          <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', flexGrow: '1' }}>
              <UserInfoWrapper />
              <FollowWapper />
            </div>
            <CardContent style={{ flexGrow: '1' }}>
              <PostContent post={post} comments={comments} />
              <CommentFooter post={post} user={user} />
            </CardContent>
          </div>
        </div> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <PicGallry images={images} />
          </Grid>
          {/* <Grid item xs={12} sm={6} style={{ display: 'flex', flexDirection: 'column', height: '120%' }}>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', flexGrow: '1' }}>
              <UserInfoWrapper />
              <FollowWapper />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '20px',
                flexGrow: 1, // 将 flexGrow 移动到这里
              }}
            >
              <PostContent post={post} comments={comments} />
              <CommentFooter post={post} user={user} />
            </div>
          </Grid> */}
          <Grid item xs={12} sm={6} style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' }}>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
              <UserInfoWrapper />
              <FollowWapper />
            </div>

            <div style={{ marginTop: '20px', overflowY: 'auto', gridRow: '2 / 3' }}>
              <PostContent post={post} comments={comments} />
            </div>

            <br></br>
            <div style={{ borderTop: '1px solid grey' }}>
              <CommentFooter post={post} user={user} />
            </div>
          </Grid>

        </Grid>

      </Card>
    </div>
  );
}

export default SinglePost;
