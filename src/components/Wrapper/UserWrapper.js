// contains information about the user avatar and name

const UserWrapper = ({ post }) => {
  return (
    <div className="userWrapper">
      <div className="avatarWrapper">
        <img src='https://images.unsplash.com/photo-1558642452-9d2a7deb7f62' alt="avatar" />
      </div>
      <div className="userName">username {post.userid}</div>
    </div>
  )
}

export default UserWrapper
