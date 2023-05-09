import { useState, useEffect } from "react";
import useLoggedInUser from "../../Hooks/useLoggedInUser";
import { useNavigate } from 'react-router-dom'
import { Paper, Button, Typography, Avatar, Grid } from '@mui/material';
import { getOneUserInfo } from "../../services/user";
import MyPosts from "./MyPosts";
import DialogComponent from "../../components/Wrapper/DialogComponent";
import { IoLocationOutline } from "react-icons/io5";
import LogoutButton from "../../components/AccountCenter/LogoutButton";
import UserList from "./UserList";

export default function Profile() {
  // 获取登陆用户信息，需要它的ID做事情
  const [logginedUserInfo, setlogginedUserInfo] = useState(null);
  const [followingCard, setfollowingCard] = useState(false);
  const [fansCard, setfansCard] = useState(false);
  const [pageStatus, setPageStatus] = useState("");
  const navigate = useNavigate();
  const logginedUser = useLoggedInUser();
  //console.log('profile:',logginedUser);
  const targetID = logginedUser.id

  // 根据ID拿用户信息
  useEffect(() => {
    // if (!targetID) {
    //   navigate('/login');
    // }
    const fetchData = async () => {
      const userInfo = await getOneUserInfo(targetID);
      setlogginedUserInfo(userInfo);
    };
    fetchData();
  }, [targetID]);


  if (!logginedUserInfo) {
    return (
      <pre>The profile is loading...</pre>
    )
  }

  const followingsList = logginedUserInfo.followings.split(',');
  const fansList = logginedUserInfo.fans.split(',');
  const avatar = logginedUserInfo.avatarUrl;

  function handleFollowingsList() {
    setfollowingCard(true);
  }
  function handleFansList() {
    setfansCard(true);
  }
  function handleSetting() {
    navigate('/accountcenter');
  }


  return (
    <div style={{ marginTop: '80px' }}>
      <Paper style={{
        margin: '0',
        paddingTop: '1%',
        paddingBottom: '1%',
        backgroundColor: '#333333',
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Grid className="avatar-username" container spacing={2} justifyContent="center" alignItems="center">
          <Grid item container xs={1} justifyContent="center" alignItems="center" flexDirection="row" gap="5px">
            <Avatar alt={`${logginedUser.username}'s Avatar`} src={avatar} style={{ width: '70px', height: '70px', border: '2px solid #fff' }} />
            <Typography variant="h2" color='primary'>{logginedUserInfo.username}</Typography>
            <Typography variant="body2" color='primary'>{logginedUserInfo.email}</Typography>
          </Grid>
        </Grid>
        <Grid className="follow" container spacing={10} justifyContent="center" alignItems="center">
          <Grid item container justifyContent="center" alignItems="center" flexDirection="column" xs={1} >
            <Typography fontSize={16} color="primary">Following</Typography>
            <Typography onClick={() => handleFollowingsList()} fontSize={16} color="primary" style={{ paddingTop: '3%', paddingBottom: '0%', cursor: 'pointer' }}> {logginedUserInfo.followings === "" ? 0 : logginedUserInfo.followings.split(',').length} </Typography>
          </Grid>
          <Grid item xs={1} container justifyContent="center" alignItems="center" flexDirection="column">
            <Typography fontSize={16} color="primary">Follower</Typography>
            <Typography onClick={() => handleFansList()} fontSize={16} color="primary" style={{ paddingTop: '3%', paddingBottom: '0%', cursor: 'pointer' }} >{logginedUserInfo.fans === "" ? 0 : logginedUserInfo.fans.split(',').length} </Typography>
          </Grid>
          <Grid item xs={1} container justifyContent="center" alignItems="center">
            <Typography fontSize={16} color="primary">Location</Typography>
            <Typography fontSize={16} color="primary"><IoLocationOutline />{logginedUserInfo.location}</Typography>
          </Grid>
        </Grid>
        <Grid className="profile-buttons" container justifyContent="center" alignItems="center" gap="10px">
          <Button variant="contained" color="primary" onClick={() => handleSetting()}>
            Settings
          </Button>
          <LogoutButton
            setPageStatus={setPageStatus}
          />
        </Grid>
      </Paper>
      <Paper style={{ backgroundColor: '#222222' }}>
        <MyPosts userid={targetID} />
      </Paper>
      <DialogComponent
        isOpen={followingCard}
        children={<UserList titleText={"You are following:"} setCardOpen={setfollowingCard} userList={followingsList} logginedUser={logginedUser} />}
      />
      <DialogComponent
        isOpen={fansCard}
        children={<UserList titleText={"Your followers:"} setCardOpen={setfansCard} userList={fansList} logginedUser={logginedUser} />}
      />
    </div>
  );
}
