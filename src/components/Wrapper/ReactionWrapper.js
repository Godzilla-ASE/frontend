// contains information about the user avatar and name
import { useState, useEffect } from 'react';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike, AiOutlineShareAlt } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { Typography, useTheme } from '@mui/material';
import { addLike, cancelLike, addDislike, cancelDislike } from '../../services/post';
import DialogComponent from './DialogComponent';
import ShareCard from './ShareCard';

const ReactionWrapper = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [sharing, setSharing] = useState(false);
  const logginedUser = useLoggedInUser();
  const navigate = useNavigate();
  const theme = useTheme();

  // 按钮初始化
  // 判断登陆用户是否已点赞点踩这篇帖子
  useEffect(() => {
    if (post && logginedUser) {
      const likeList = post.like_users ? post.like_users.split(",") : [];
      const dislikeList = post.unlike_users ? post.unlike_users.split(",") : [];
      if (likeList.includes(logginedUser.userID.toString())) {
        setLiked(true);
      } else {
        setLiked(false);
      }
      if (dislikeList.includes(logginedUser.userID.toString())) {
        setDisliked(true);
      } else {
        setDisliked(false);
      }
    }
  }, [post, logginedUser]);

  if (!logginedUser) {
    return (
      <pre>Loading...</pre>
    )
  }

  const handleLikeClick = () => {
    if (!logginedUser) {
      navigate('/login')
    } else {
      if (liked) {
        cancelLike(post.id, logginedUser.userID);
      } else {
        addLike(post.id, logginedUser.userID);
      }
      setLiked(!liked);
    }
  }

  const handleDisLikeClick = () => {
    if (!logginedUser) {
      navigate('/login')
    } else {
      if (disliked) {
        cancelDislike(post.id, logginedUser.userID);
      } else {
        addDislike(post.id, logginedUser.userID);
      }
      setDisliked(!disliked);
    }
  }
  const handleShare = () => {
    setSharing(true);
  }

  return (
    <div style={{ display: 'flex', alignContent: 'center', marginTop: '10px', gap: '10px' }}>
      <div onClick={handleLikeClick} style={{ display: 'flex', alignContent: 'center' }}>
        {liked
          ? <AiFillLike className="likesIcon" color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />
          : <AiOutlineLike className="likesIcon" color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />}
        {post.likeNum > 0
          ? <Typography variant='body2' align="left" fontWeight="bold" color="secondary">{post.likeNum}</Typography>
          : null}
      </div>
      <div onClick={handleDisLikeClick} style={{ display: 'flex', alignContent: 'center' }}>
        {disliked
          ? <AiFillDislike className="dislikesIcon" color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />
          : <AiOutlineDislike className="dislikesIcon" color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />}
        {post.unlikeNum > 0
          ? <Typography variant='body2' align="left" fontWeight="bold" color="secondary">{post.unlikeNum}</Typography>
          : null}
      </div>
      <div onClick={handleShare} style={{ display: 'flex', alignContent: 'center' }}>
        <AiOutlineShareAlt color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />
      </div>
      <DialogComponent
        isOpen={sharing}
        children={<ShareCard url={"http://localhost/post/" + post.id} setSharing={setSharing} />}
      />
    </div>
  )
}

export default ReactionWrapper
