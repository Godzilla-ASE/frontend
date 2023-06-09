// contains information about the user avatar and name
import { Avatar, Box, Typography } from '@mui/material';
import { getOneUserInfo } from '../../services/user';
import { useEffect, useState } from 'react';
import useLoggedInUser from '../../hooks/useLoggedInUser'


const UserInfoWrapper = (props) => {
  const loggedInUser = useLoggedInUser()
  const [user, setUser] = useState(loggedInUser);

  useEffect(() => {
    if (props.id) {
      const fetchData = async () => {
        const user = await getOneUserInfo(props.id);
        setUser(user);
      };
      fetchData();
    }
    if (props.user) {
      setUser(props.user)
    }
  }, [props]);

  return (
    (user &&
      <Box display="flex" alignItems="center">
        <Avatar
          src={user.avatarUrl}
          alt={`${user.username}'s avatar`}
          sx={{ width: 30, height: 30, marginRight: 1 }}
        />
        <Typography variant="body2" color="secondary" fontWeight="bold">
          {user.username}
        </Typography>
      </Box >
    ) || null
  );
};


export default UserInfoWrapper
