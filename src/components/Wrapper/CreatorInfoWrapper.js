// contains information about the user avatar and name
import { Avatar, Box, Typography } from '@mui/material';


const CreatorInfoWrapper = () => {
  // #TODO change this to logginuser later
  const user = {
    username: 'IMuser'
  }
  return (
    <Box display="flex" alignItems="center">
      {/* #TODO 后期要修改为用户对应的头像 */}
      <Avatar
        src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62"
        alt={`${user.username}'s avatar`}
        sx={{ width: 30, height: 30, marginRight: 1 }}
      />
      <Typography variant="body2" color="secondary" fontWeight="bold">
        {user.username}
      </Typography>
    </Box>
  )
}

export default CreatorInfoWrapper
