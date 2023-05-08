import React, { useState } from 'react';
import { Grid, Typography, Button, Avatar, Card, CardHeader, CardContent, CardActions, Box } from '@mui/material';
import FollowWrapper from '../../components/Wrapper/FollowWrapper';
import UserInfoWrapper from '../../components/Wrapper/UserInfoWrapper';
import { useNavigate } from 'react-router-dom';

const FollowingCard = ({ isFollowing, setfollowingCard, fansList, followingsList, logginedUser }) => {
  console.log(followingsList);
  console.log(logginedUser);
  const [selectedTab, setSelectedTab] = useState(isFollowing ? 'following' : 'followers');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleBack = () => {
    setfollowingCard(false);
  };

  const handleUserVist = (userId) => {
    console.log(`/profile/${userId}`);
    navigate(`/profile/${userId}`)
  };

  if (!logginedUser) {
    return (
      <pre>Loading...</pre>
    )
  }

  return (
    <Card style={{ width: '20%', height: '500px', overflowY: 'auto', padding: '10px', position: 'fixed', top: '25%', left: '40%' }}>
      <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
        <Button onClick={() => handleBack()} style={{ color: '#000000', backgroundColor: '#dddddd' }}>
          Back
        </Button>
        <Button onClick={() => handleTabChange('followers')} style={{ color: '#4477cc', backgroundColor: '#dddddd' }}>
          Fans
        </Button>
        <Button onClick={() => handleTabChange('following')} style={{ color: '#4477cc', backgroundColor: '#dddddd' }}>
          Followings
        </Button>
      </div>

      <div>
        {selectedTab === 'following' ? followingsList[0] === '' ? <Grid container spacing={1} style={{ marginTop: '0px' }}></Grid> :
          <Grid container spacing={1} style={{ marginTop: '0px' }}>
            {followingsList.map((userId) => (
              <Grid item xs={12} key={userId} style={{ paddingTop: '3%' }} >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                  <div onClick={() => handleUserVist(userId)}>
                    <UserInfoWrapper userID={userId} />
                  </div>
                  <FollowWrapper loginUser={logginedUser} userID={userId} />
                </div>
              </Grid>
            ))}
          </Grid> : fansList[0] === '' ? <Grid container spacing={1} style={{ marginTop: '0px' }}></Grid> :
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            {fansList.map((userId) => (
              <Grid item xs={12} key={userId} style={{ paddingTop: '3%' }} >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                  <div onClick={() => handleUserVist(userId)}>
                    <UserInfoWrapper userID={userId} />
                  </div>
                  <FollowWrapper loginUser={logginedUser} userId={userId} />
                </div>
              </Grid>
            ))}
          </Grid>}
      </div>
    </Card>
  );
};

export default FollowingCard;
