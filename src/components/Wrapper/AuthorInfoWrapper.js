// contains information about the user avatar and name
import { Typography, Avatar } from "@mui/material"

const AuthorInfoWrapper = ({ post }) => {
  let username
  let userAvatar
  if (post.username_from == null) {
    username = post.username;
    userAvatar = post.user_avatar
  } else {
    username = post.username_from;
    userAvatar = post.userAvatar_from
  }
  return (
    <div className="userWrapper">
      <Avatar
        src={userAvatar}
        alt={`${username}'s avatar`}
        sx={{ width: 30, height: 30, marginRight: 1 }}
      />
      <Typography variant="body2" color="secondary" fontWeight="bold">
        {username}
      </Typography>
    </div>
  )
}

export default AuthorInfoWrapper
