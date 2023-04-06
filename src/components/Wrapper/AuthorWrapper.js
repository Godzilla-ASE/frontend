// contains information about the post author: user avatar and name, likes button and the count of likes
import UserWrapper from "./UserWrapper"
import ReactionWrapper from "./ReactionWrapper"

const AuthorWrapper = ({ post }) => {
  return (
    <div className="authorWrapper">
      <UserWrapper post={post} />
      <ReactionWrapper post={post} />
    </div>
  )
}

export default AuthorWrapper
