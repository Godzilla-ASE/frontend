// contains information about the user avatar and name
import { useState } from 'react';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'
import LoggedInUser from '../Helper/LoggedInUser';
import { Typography, useTheme } from '@mui/material';

const ReactionWrapper = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const user = LoggedInUser() // #TODO 可以直接获取还是需要等
  const navigate = useNavigate();
  const theme = useTheme()

  const handleLikeClick = () => {
    // #TODO add communication to the server
    if (!user) {
      navigate('/login')
    } else {
      setLiked(!liked);
    }
  }

  const handleDisLikeClick = () => {
    // #TODO add communication to the server
    if (!user) {
      navigate('/login')
    } else {
      setDisliked(!disliked);
    }
  }

  return (
    <div className="reactionWrapper">
      <div className="likesWrapper" onClick={handleLikeClick}>
        {liked
          ? <AiFillLike className="likesIcon" color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />
          : <AiOutlineLike className="likesIcon" color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />}
        {post.like > 0
          ? <Typography variant='body2' align="left" fontWeight="bold" color="secondary">{post.like}</Typography>
          : null}
      </div>
      <div className="dislikesWrapper" onClick={handleDisLikeClick}>
        {disliked
          ? <AiFillDislike className="dislikesIcon" color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />
          : <AiOutlineDislike className="dislikesIcon" color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />}
        {post.unlike > 0
          ? <Typography variant='body2' align="left" fontWeight="bold" color="secondary">{post.unlike}</Typography>
          : null}
      </div>
    </div>
  )
}

export default ReactionWrapper
