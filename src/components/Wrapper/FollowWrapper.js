import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { getOneUserInfo, addFollower, cancelFollower } from '../../services/user'

export default function FollowWapper({ loginUser, id }) {

  // 按钮初始化，如果已登陆且已经关注，就显示followed
  const [UserInfo, setUserInfo] = useState(null);
  const [followed, setFollowed] = useState(false);
  const navigate = useNavigate();
  // 获取被关注用户信息

  useEffect(() => {
    const fetchData = async () => {
      const result = await getOneUserInfo(id);
      setUserInfo(result);
    };
    fetchData();
  }, [id]);

  // 判断当前登陆用户是否已关注这个用户
  useEffect(() => {
    if (UserInfo !== null && loginUser) {
      console.log("用户", id, UserInfo);
      const authorFans = UserInfo.fans.split(",");
      const loginUserID = loginUser.id;
      if (authorFans.includes(loginUserID.toString())) {
        setFollowed(true);
      } else {
        setFollowed(false);
      }
    }
  }, [UserInfo]);

  if (!UserInfo) {
    return (
      <pre>Loading.UserInfo..</pre>
    )
  }
  // 按钮初始化结束
  if (loginUser && loginUser.id.toString() === id.toString()) {
    return (<div></div>)
  }

  const handleFollowClick = () => {
    if (!loginUser) {
      navigate("/login");
    }
    else {
      if (followed) {
        cancelFollower(loginUser.id, id, loginUser.authToken);
      } else {
        addFollower(loginUser.id, id, loginUser.authToken);
      }
      setFollowed(!followed);
    }
  }

  return (
    <div>
      {!followed
        ? <Button onClick={handleFollowClick} size="small">
          <Typography variant="body2" fontWeight="bold">
            Follow
          </Typography>
        </Button>
        :
        <Button onClick={handleFollowClick} variant="contained" size="small">
          <Typography variant="body2" fontWeight="bold">
            Unfollow
          </Typography>
        </Button>}
    </div>
  )
}