// contains information about the user avatar and name
import { Typography, Avatar } from "@mui/material"

const AuthorInfoWrapper = ({ post }) => {
  return (
    <div className="userWrapper">
      <Avatar
        src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62"
        alt={`${post.username}'s avatar`}
        sx={{ width: 30, height: 30, marginRight: 1 }}
      />
      <Typography variant="body2" color="secondary" fontWeight="bold">
        {post.username}
      </Typography>
    </div>
  )
}

export default AuthorInfoWrapper
