// contains information about the post author: user avatar and name, likes button and the count of likes
import AuthorInfoWrapper from "./AuthorInfoWrapper"
import ReactionWrapper from "./ReactionWrapper"

const AuthorWrapper = ({ post }) => {
  return (
    <div className="authorWrapper">
      <AuthorInfoWrapper post={post} />
      <ReactionWrapper post={post} />
    </div>
  )
}

export default AuthorWrapper
