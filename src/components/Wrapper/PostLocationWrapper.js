// contains the information of a post: location

import { IoLocationOutline } from "react-icons/io5";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from "@mui/system";

const LocationBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: '10px',
  alignItems: 'center'
});

const PostLocationWrapper = ({ post }) => {
  const theme = useTheme()
  return (
    <Link to={`/location/${post.location}`} style={{ textDecoration: 'none' }}>
      <LocationBox>
        <IoLocationOutline color={theme.palette.thirdInformation.main} />
        <Typography variant='body3' align="left" color={theme.palette.thirdInformation.main}>
          {post.location}
        </Typography>
      </LocationBox>
    </Link>
  );
}

export default PostLocationWrapper
