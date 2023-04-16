import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { HiUserRemove } from 'react-icons/hi'
import { Typography, Button } from '@mui/material';

export default function FollowWapper({ loginUser, user }) {

  const [followed, setFollowed] = useState(false);

  const navigate = useNavigate();

  const handleFollowClick = () => {
    // update it to communicate with the server
    // if (!user) {
    //   navigate("/login");
    // } else {
    //   setFollowed(!followed);
    // }
    setFollowed(!followed);
  }

  return (
    <div>
      {!followed
        ? <Button onClick={handleFollowClick} color="submit" size="small">
          <Typography variant="body2" fontWeight="bold">
            Follow
          </Typography>
        </Button>
        :
        <Button onClick={handleFollowClick} color="submit" variant="contained" size="small">
          <Typography variant="body2" fontWeight="bold">
            Unfollow
          </Typography>
        </Button>}
    </div>
  )
}