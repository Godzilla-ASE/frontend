import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { getOneUserInfo,addFollower,cancelFollower } from '../../services/user'

export default function FollowWapper({ loginUser, userID }) {

  // 按钮初始化，如果已登陆且已经关注，就显示followed
  const [UserInfo, setUserInfo] = useState(null);
  const [followed, setFollowed] = useState(false);
  const navigate = useNavigate();

  // 获取被关注用户信息
  useEffect(() => {
    getOneUserInfo(userID).then((result) => {
      setUserInfo(result)
      //console.log(result);
    });
  }, [userID]);

  // 判断当前登陆用户是否已关注这个用户
  useEffect(() => {
    if (UserInfo && loginUser) {
      const authorFans = UserInfo.fans.split(",");
      const loginUserID = loginUser.userID;
      if (authorFans.includes(loginUserID.toString())) {
        setFollowed(true);
      } else {
        setFollowed(false);
      }
    }
  }, [UserInfo, loginUser]);

  if (!UserInfo) {
    return (
      <pre>Loading...</pre>
    )
  }
  // 按钮初始化结束

  const handleFollowClick = () => {
    if (!loginUser) {
      navigate("/login");
    }
    else {
      if(followed){
        cancelFollower(loginUser.userID, userID);
      }else{
        addFollower(loginUser.userID, userID);
      }
      setFollowed(!followed);
    }
  }

  return (
    <div>
      {!followed
        ? <Button onClick={handleFollowClick} color="submit" size="small">
          <Typography variant="body2" fontWeight="bold">
            Follow
          </Typography>
        </Button>
        :
        <Button onClick={handleFollowClick} color="submit" variant="contained" size="small">
          <Typography variant="body2" fontWeight="bold">
            Unfollow
          </Typography>
        </Button>}
    </div>
  )
}