import { useState, useEffect } from "react";
import useLoggedInUser from "../../Hooks/useLoggedInUser";
import { useNavigate, useParams } from 'react-router-dom'
import { Paper, Typography, Avatar, Grid } from '@mui/material';
import { getOneUserInfo } from "../../services/user";
import MyPosts from "./MyPosts";
import DialogComponent from "../../components/Wrapper/DialogComponent";
import { IoLocationOutline } from "react-icons/io5";
import UserList from "./UserList";
import FollowWapper from "../../components/Wrapper/FollowWrapper";

export default function Profile() {
  // get target user id
  const visitedUserID = useParams().visitedUserId;
  const [visitedUserInfo, setvisitedUserInfo] = useState(null);
  const [logginedUserInfo, setlogginedUserInfo] = useState(null);
  const [followingCard, setfollowingCard] = useState(false);
  const navigate = useNavigate();
  const [fansCard, setfansCard] = useState(false);
  const logginedUser = useLoggedInUser();

  // get more info of target user id
  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getOneUserInfo(visitedUserID);
      setvisitedUserInfo(userInfo);
    };
    fetchData();
  }, [visitedUserID]);


  if (!visitedUserInfo) {
    return (
      <pre>Loading...</pre>
    )
  }
  const followingsList = visitedUserInfo.followings.split(',');
  const fansList = visitedUserInfo.fans.split(',');
  const avatar = visitedUserInfo.avatarUrl;

  function handleFollowingsList() {
    setfollowingCard(true);
  }
  function handleFansList() {
    setfansCard(true);
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
            <Avatar alt={`${visitedUserInfo.username}'s Avatar`} src={avatar} style={{ width: '70px', height: '70px', border: '2px solid #fff' }} />
            <Typography variant="h2" color='primary'>{visitedUserInfo.username}</Typography>
            <Typography variant="body2" color='primary'>{visitedUserInfo.email}</Typography>
          </Grid>
        </Grid>
        <Grid className="follow" container spacing={10} justifyContent="center" alignItems="center">
          <Grid item container justifyContent="center" alignItems="center" flexDirection="column" xs={1} >
            <Typography fontSize={16} color="primary">Following</Typography>
            <Typography onClick={() => handleFollowingsList()} fontSize={16} color="primary" style={{ paddingTop: '3%', paddingBottom: '0%', cursor: 'pointer' }}> {visitedUserInfo.followings === "" ? 0 : visitedUserInfo.followings.split(',').length} </Typography>
          </Grid>
          <Grid item xs={1} container justifyContent="center" alignItems="center" flexDirection="column">
            <Typography fontSize={16} color="primary">Follower</Typography>
            <Typography onClick={() => handleFansList()} fontSize={16} color="primary" style={{ paddingTop: '3%', paddingBottom: '0%', cursor: 'pointer' }} >{visitedUserInfo.fans === "" ? 0 : visitedUserInfo.fans.split(',').length} </Typography>
          </Grid>
          <Grid item xs={1} container justifyContent="center" alignItems="center">
            <Typography fontSize={16} color="primary">Location</Typography>
            <Typography fontSize={16} color="primary"><IoLocationOutline />{visitedUserInfo.location}</Typography>
          </Grid>
        </Grid>
        <Grid className="profile-buttons" container justifyContent="center" alignItems="center" gap="10px">
          <FollowWapper loginUser={logginedUser} id={visitedUserID} />
        </Grid>
      </Paper>
      <Paper style={{ backgroundColor: '#222222' }}>
        <MyPosts userid={visitedUserInfo.id} />
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
