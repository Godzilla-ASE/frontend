import { useState, useEffect } from "react";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { useNavigate } from 'react-router-dom'
import { Paper, Button, Typography, Avatar, Grid } from '@mui/material';
import { getOneUserInfo } from "../services/user";
import MyPosts from "./MyPosts";
import { getAll, 172.20.10.3 } from "../services/post";
import { usePosts } from "../hooks/usePosts";

export default function Profile() {
  // 获取登陆用户信息，需要它的ID做事情
  const [logginedUserInfo, setlogginedUserInfo] = useState(null);
  const navigate = useNavigate();
  const logginedUser = useLoggedInUser();
  console.log(logginedUser);

  if (!logginedUser) {
    navigate('/login');
  }
  // 根据ID拿用户信息
  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getOneUserInfo(logginedUser.userID);
      setlogginedUserInfo(userInfo);
    };
    fetchData();
  }, []);


  if (!logginedUserInfo) {
    return (
      <pre>Loading...</pre>
    )
  }

  function handleLogout() {

  }

  return (
    <div style={{ margin: '0', paddingTop: '7%' }}>
      <Paper style={{ margin: '0', paddingTop: '1%', paddingBottom: '1%', backgroundColor: '#333333' }} >
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={1}>
            <Avatar alt="User Avatar" src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" style={{ width: '70px', height: '70px' }} />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h4" color={'#ffffff'}>{logginedUserInfo.username}</Typography>
            <Typography variant="subtitle1" color={'#ffffff'}>{logginedUserInfo.email}</Typography>
          </Grid>
          <Grid item xs={1} />
          <Grid item>
            <Button variant="contained" color="primary" >
              Setting
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ backgroundColor: '#222222' }}>
        <MyPosts userid={logginedUser.userID} />
      </Paper>
    </div>
  );
}
