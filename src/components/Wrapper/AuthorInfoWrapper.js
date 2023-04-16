// contains information about the user avatar and name
import { Typography, Avatar } from "@mui/material"

const AuthorInfoWrapper = ({ post }) => {
  var username = null;
  if(post.username_from == null){
    username = post.username;
  }else{
    username = post.username_from;
  }
  return (
    <div className="userWrapper">
      <Avatar
        src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62"
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
