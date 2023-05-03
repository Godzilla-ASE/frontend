// contains information about the user avatar and name
import { Avatar, Box, Typography } from '@mui/material';
import useLoggedInUser from '../Helper/useLoggedInUser';


const UserInfoWrapper = () => {
  const user = useLoggedInUser()
  return (
    <Box display="flex" alignItems="center">
      <Avatar
        src={user.avatar}
        alt={`${user.username}'s avatar`}
        sx={{ width: 30, height: 30, marginRight: 1 }}
      />
      <Typography variant="body2" color="secondary" fontWeight="bold">
        {user.username}
      </Typography>
    </Box>
  )
}

export default UserInfoWrapper
