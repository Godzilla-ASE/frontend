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
  //console.log(post.like_users.split(","));
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likedNum, setlikedNum] = useState(0);
  const [dislikedNum, setDislikedNum] = useState(0);
  const [likeList, setLikeList] = useState("");
  const [dislikeList, setDislikeList] = useState("");
  const [sharing, setSharing] = useState(false);
  const logginedUser = useLoggedInUser();
  const navigate = useNavigate();
  const theme = useTheme();

  // 按钮初始化
  // 判断登陆用户是否已点赞点踩这篇帖子
  useEffect(() => {
    if (post && logginedUser) {
      //console.log(post.like_users.split(','));
      if(post.like_users){
        console.log(post.like_users.split(','));
        setLikeList(post.like_users.split(','));
        setDislikeList(post.unlike_users.split(','));
        setlikedNum(post.likeNum);
        setDislikedNum(post.unlikeNum);
      }

      if(likeList.includes(logginedUser.userID.toString())){
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
  // 按钮初始化结束

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
        setlikedNum(likedNum-1);
      }else{
        addLike(post.id, logginedUser.userID);
        setlikedNum(likedNum+1);
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
        setDislikedNum(dislikedNum-1);
      }else{
        addDislike(post.id, logginedUser.userID);
        setDislikedNum(dislikedNum+1);
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
