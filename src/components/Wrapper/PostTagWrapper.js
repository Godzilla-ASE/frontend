// contains the information of a post: tags
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Wrap the div in a styled Box component.
const TagBox = styled(Box)({
  display: 'flex', // Set up Flex layout
  flexWrap: 'wrap', // Allow line breaks for child elements
});

const PostTagWrapper = ({ post }) => {
  const tags = post.tag.split(',')
  return (
    <TagBox>
      {tags.map((tag, index) => (
        <Link key={tag} to={`/tag/${tag}`} style={{ textDecoration: 'none' }}>
          <Typography variant='body2' align="left"
            style={{
              marginRight: index !== tags.length - 1 ? '5px' : '0',
            }}
          >
            {'#' + tag}
          </Typography>
        </Link>
      ))}
    </TagBox>
  );
}

export default PostTagWrapper
