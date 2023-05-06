// contains information about the user avatar and name
import { Avatar, Box, Typography } from '@mui/material';
<<<<<<< HEAD
import { getOneUserInfo } from '../../services/user';
import { useEffect, useState } from 'react';


const UserInfoWrapper = (props) => {
  // #TODO change this to logginuser later
  const [userInfo, setUserInfo] = useState(null);
  console.log('userinfowarpper',props.userID)

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getOneUserInfo(props.userID);
      setUserInfo(userInfo);
    };
    fetchData();
  }, [props.userID]);

      
  if (!userInfo) {
    return (
        <pre>Loading...</pre>
    )
    }
=======
import useLoggedInUser from '../../hooks/useLoggedInUser';


const UserInfoWrapper = () => {
  const user = useLoggedInUser();

  if (!user) {
    return <div>Loading...</div>;
  }
>>>>>>> origin/main

  return (
    <Box display="flex" alignItems="center">
      <Avatar
<<<<<<< HEAD
        src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62"
        alt={`${userInfo.username}'s avatar`}
=======
        src={user.avatar}
        alt={`${user.username}'s avatar`}
>>>>>>> origin/main
        sx={{ width: 30, height: 30, marginRight: 1 }}
      />
      <Typography variant="body2" color="secondary" fontWeight="bold">
        {userInfo.username}
      </Typography>
    </Box>
  );
};


export default UserInfoWrapper
