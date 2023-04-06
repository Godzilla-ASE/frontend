// contains information about the user avatar and name
import { Typography } from "@mui/material"

const AuthorInfoWrapper = ({ post }) => {
  return (
    <div className="userWrapper">
      <div className="avatarWrapper">
        {/* #TODO add avatar */}
        <img src='https://images.unsplash.com/photo-1558642452-9d2a7deb7f62' alt="avatar" />
      </div>
      <Typography variant="body2" color="secondary" fontWeight="bold">
        {post.username}
      </Typography>
    </div>
  )
}

export default AuthorInfoWrapper
