import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { HiUserRemove } from 'react-icons/hi'

export default function FollowWapper({loginUser, user}) {

    const [followed, setFollowed] = useState(false);
    const navigate = useNavigate();

    const handleFollowClick = () => {
        // update it to communicate with the server
        if (!user) {
            navigate("/login");
        }else{
            setFollowed(!followed);
        }
      }

    return(
        <IconButton>
            <div onClick={handleFollowClick}>
                {followed ? <AiOutlineUserAdd className="" color="#FF4136" size={25} /> : <HiUserRemove className="" color="#FF4136" size={25} />}
            </div>
        </IconButton>
    )
}