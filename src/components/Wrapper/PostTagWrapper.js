// contains the information of a post: tags

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const TagBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '10px'
});

const PostTagWrapper = ({ post }) => {

  const theme = useTheme()

  // The tags returned by the backend is in format: "tag1,tag2,tag3", so we need so logic here to convert them
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
