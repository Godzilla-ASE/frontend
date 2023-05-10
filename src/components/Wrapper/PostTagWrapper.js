// contains the information of a post: tags
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

// Wrap the div in a styled Box component.
const TagBox = styled(Box)({
  display: 'flex', // Set up Flex layout
  flexWrap: 'wrap', // Allow line breaks for child elements
  marginTop: '10px'
});

const PostTagWrapper = ({ post }) => {
  const theme = useTheme()
  const tags = post.tag.length > 0 ? post.tag.split(',') : post.tag
  return (
    <TagBox>
      {tags.length > 0 && tags.map((tag, index) => (
        <Link key={tag} to={`/tag/${tag}`} style={{ textDecoration: 'none' }}>
          <Typography variant='body2' align="left" color={theme.palette.thirdInformation.main}
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
