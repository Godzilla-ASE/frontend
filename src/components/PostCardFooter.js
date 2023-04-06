import AuthorWrapper from './Wrapper/AuthorWrapper';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const PostCardFooter = ({ post }) => {

  return (
    <div className="postCardFooter">
      <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
        <Typography variant='body1' align="left" fontWeight="bold">
          {post.title}
        </Typography>
      </Link>
      <AuthorWrapper post={post} />
    </div>
  )
}
export default PostCardFooter
