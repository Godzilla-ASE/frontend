// contains information about the post author: user avatar and name, likes button and the count of likes
import UserWrapper from "./UserWrapper"
import ReactionWrapper from "./ReactionWrapper"

const AuthorWrapper = ({ post, user }) => {
  return (
    <div className="authorWrapper">
      <UserWrapper post={post} />
      <ReactionWrapper post={post} user={user} />
    </div>
  )
}

export default AuthorWrapper
