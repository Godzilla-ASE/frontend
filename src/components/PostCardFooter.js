import AuthorWrapper from './Wrapper/AuthorWrapper';
import { Link } from 'react-router-dom';

const PostCardFooter = ({ post, user }) => {
  return (
    <div className="postCardFooter">
      {/* <span className="postTitle"></span> */}
      <Link to={`/post/${post.id}`}>{post.title}</Link>
      <AuthorWrapper post={post} user={user} />
    </div>
  )
}
export default PostCardFooter
