import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardMedia, Avatar, Typography, Button, TextField, Grid } from '@mui/material';
import './post.css';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getAll, getOne } from '../services/post';
import { AiOutlineLike, AiOutlineDislike, AiFillLike,AiOutlineUserAdd,AiFillDislike, AiOutlineShareAlt,AiFillLeftCircle,AiFillRightCircle, AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import {HiUserRemove} from 'react-icons/hi'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function SinglePost() {

  const params = useParams()
  //onst postId = params.postId;  // 假设需要获取的帖子的 ID 为 12345
  const postId = 1;
  const navigate = useNavigate();

  const [postData, setPostData] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [followed, setFollowed] = useState(false);

  // const [images] = useState([
  //   '/Image0.jpg',
  //   '/Image1.png',
  //   '/Image2.jpg',
  // ]); // #TODO 改成了直接从 post 获取
  // const picNum = images.length;

  const url = "http://localhost:3000/db.json";
  const token = "1234";

  //发送请求拿单篇帖子的data
  // useEffect(() => {
  //   fetch(url, {
  //     headers: {
  //       'Authorization': 'Bearer ' + token
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(data => setPostData(data))
  //   .catch(error => console.error(error));
  // }, [token]);

  //测试数据
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAll(postId);
      setPostData(data[0]);
    }
    fetchData()
    // check if any user logged in
    // const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON)
    //   setUserLogIn(user)
    //   // blogService.setToken(user.token)
    // }
  }, [])
  //真数据
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getOne(postId);
  //     console.log(data);
  //     setPostData(data);
  //   }
  //   fetchData()
  // }, [])

  if (!postData) {
    return (
      //#TODO 加一个  loading 信息
      <pre>Loading...</pre>
    )
  }


  console.log(postData);
  console.log(postData.title);
  

  //拆解json里的data数据
  //正文
  
  const title = postData.title != null ? postData.title : "NULL Title";
  const content = postData.content.text != null ? postData.content.text : "NULL Text";

  const creationDate = postData.creation_Date.toisoString != null ? postData.creation_Date : "NULL Date";
  //const location = postData.location != null ? postData.location : "NULL location";
  //const tags = postData.tag != null ? postData.tag : [];

  // const title = "postData.title"; 
  // const content = "postData.content.textpostData.content.textpostData.content.textpostData.content.textpostData.content.textpostData.content.textpostData.content.textpostData.content.text";
  // const creationDate = "postData.creation_Date";
  // const likeCount = 34;
  // const dislikeCount = 2;

  //图片
  // const imagePaths = postData.content.image != null ? postData.content.image : [];
  // const picNum = imagePaths.length;

  // const images = [];
  // for(let i=0; i<picNum; i++){
  //   images.push(imagePaths[i]);
  // }

  //联调测试
  const images = [postData.conten_img]
  const picNum = images.length;

  //交互相关
  // const likeCount = postData.like != null ? postData.like.length : 0;
  // const dislikeCount = postData.unlike != null ? postData.unlike.length : 0;
  const likeCount = postData.like != null ? postData.like: 0;
  const dislikeCount = postData.unlike != null ? postData.unlike: 0;
  const postUrl = postData.url != null? postData.url : "NULL Url";
  const userId = postData.userid != null ? postData.userid : "NULL Id";
  const username = postData.username !=null ? postData.username : "NULL Username";

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const handleMouseEnter = () => {
    document.getElementById('leftBtn').style.display = 'block';
    document.getElementById('rightBtn').style.display = 'block';
    document.getElementById('picIndex').style.display = 'block';
  };

  const handleMouseLeave = () => {
    document.getElementById('leftBtn').style.display = 'none';
    document.getElementById('rightBtn').style.display = 'none';
    document.getElementById('picIndex').style.display = 'none';
  };

  const handleLikeClick = () => {
    // update it to communicate with the server
    if(token==null){
      navigate("/login");
    }
    setLiked(!liked);
  }

  const handleFollowClick = () => {
    // update it to communicate with the server
    if(token==null){
      navigate("/login");
    }
    setFollowed(!followed);
  }

  const handleDisLikeClick = () => {
    // update it to communicate with the server
    if(params==null){
      navigate("/login");
    }
    setDisliked(!disliked);
  }
  const handleShare = () => {
    // update it to communicate with the server
    //setDisliked(!disliked);
  }

  return (
    // #TODO 因为或许信息需要等，可能需要变成 conditional rendering
    <div style={{ height: '100%' , display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
      <Card className="post-card">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div className="scrollable-container-photo" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ position: 'relative' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '550px' }}>
                <CardMedia component="img" image={images[currentIndex]} alt="post image" style={{ top: '1%' }} />
              </div>
              <Typography id="picIndex" variant="contained" style={{ position: 'absolute', top: '5%', right: '3%', zIndex: 1, display: 'none', color: 'white', backgroundColor: "#585858", padding: "3px 4px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", borderRadius: '10px' }}>
                {currentIndex + 1}/{picNum}
              </Typography>
              <div id="leftBtn" onClick={handlePrev} style={{ position: 'absolute', top: '50%', left: '1%', zIndex: 1, display: 'none' }}>
                  {<AiFillLeftCircle className="leftBottom" color="#dddddd" size={35}/>}
              </div>
              <div id="rightBtn" onClick={handleNext} style={{ position: 'absolute', top: '50%', right: '1%', zIndex: 1, display: 'none' }}>
                  {<AiFillRightCircle className="rightBottom" color="#dddddd" size={35}/>}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardHeader
              avatar={
                <Avatar src="/logo192.png" />
              }
              title={username}
              action={
                <IconButton>
                <div className="shareWrapper" onClick={handleFollowClick}>
                  {followed ? <AiOutlineUserAdd className="" color="#FF4136" size={25}/> : <HiUserRemove className="" color="#FF4136" size={25}/>}
                </div>
                </IconButton>
              }
            />
            <CardContent >
              <div className="scrollable-container">
              <Typography variant="subtitle1" color="text.secondary">
                  Publish Date: {creationDate}
                </Typography>
                <Typography variant="h4" component="h2">
                  {title}
                </Typography>
                <br></br>
                <Typography variant="body1" color="text.primary">
                  {content}
                </Typography>
                <br></br>
                <Typography variant="h6" component="h3" gutterBottom>
                  Comments
                </Typography>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No comment so far
                  </Typography>
                </div>
                <br></br>
              </div>
              <Grid container spacing={2} alignItems="center">
                <Grid item style={{ paddingTop: '5%' }}>
                <div className="likesWrapper" onClick={handleLikeClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {liked ? <AiFillLike className="likesIcon" color="#FF4136" size={25} /> : <AiOutlineLike className="likesIcon" color="#818181" size={25} />}
                  <span className="likesCount">{likeCount}</span>
                </div>
                </Grid>
                <Grid item style={{ paddingTop: '5%' }}>
                <div className="dislikesWrapper" onClick={handleDisLikeClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {disliked ? <AiFillDislike className="dislikesIcon" color="#FF4136" size={25} /> : <AiOutlineDislike className="dislikesIcon" color="#818181" size={25} />}
                  <span className="dislikesCount">{dislikeCount}</span>
                </div>
                </Grid>
                <Grid item style={{ paddingTop: '5%' }}>
                <div className="shareWrapper" onClick={handleShare}>
                  {<AiOutlineShareAlt className="" color="#FF4136" size={25}/>}
                </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: 'flex' }}>
                    <TextField label="Say something" variant="outlined" fullWidth />
                    <Button variant="contained" color="primary" style={{ left: '15px'}} >Comment</Button>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default SinglePost;
