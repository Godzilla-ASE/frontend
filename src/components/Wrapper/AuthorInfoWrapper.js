// contains information about the user avatar and name

const AuthorInfoWrapper = ({ post }) => {
  return (
    <div className="userWrapper">
      <div className="avatarWrapper">
        {/* #TODO add avatar */}
        <img src='https://images.unsplash.com/photo-1558642452-9d2a7deb7f62' alt="avatar" />
      </div>
      <div className="userName">{post.username}</div>
    </div>
  )
}

export default AuthorInfoWrapper
