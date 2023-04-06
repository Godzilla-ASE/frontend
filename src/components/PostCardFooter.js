import AuthorWrapper from './Wrapper/AuthorWrapper';
import PostTagWrapper from './Wrapper/PostTagWrapper';
import PostLocationWrapper from './Wrapper/PostLocationWrapper';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const FooterStyleDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.postBackground.main,
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
}));

const PostCardFooter = ({ post }) => {

  return (
    <FooterStyleDiv className="postCardFooter">
      <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
        <Typography variant='body1' align="left" fontWeight="bold" color="primary">
          {post.title}
        </Typography>
      </Link>
      <PostTagWrapper post={post} />
      <AuthorWrapper post={post} />
      <PostLocationWrapper post={post} />
    </FooterStyleDiv>
  )
}
export default PostCardFooter
