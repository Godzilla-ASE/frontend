// contains the information of a post: location

import { IoLocationOutline } from "react-icons/io5";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Wrap the div in a styled Box component.
const LocationBox = styled(Box)({
  display: 'flex', // Set up Flex layout
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: '5px',
  alignItems: 'center'
});

const PostLocationWrapper = ({ post }) => {
  return (
    <Link to={`/location/${post.location}`} style={{ textDecoration: 'none' }}>
      <LocationBox>
        <IoLocationOutline />
        <Typography variant='body2' align="left">
          {post.location}
        </Typography>
      </LocationBox>
    </Link>
  );
}

export default PostLocationWrapper
