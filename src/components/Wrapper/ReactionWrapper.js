// contains information about the user avatar and name
import { useState, useEffect } from 'react';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike, AiOutlineShareAlt } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'
import useLoggedInUser from '../../Hooks/useLoggedInUser';
import { Typography, useTheme } from '@mui/material';
import { addLike, cancelLike, addDislike, cancelDislike } from '../../services/post';
import DialogComponent from './DialogComponent';
import ShareCard from '../ShareCard';
import UserList from '../../views/Profile/UserList';

const ReactionWrapper = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likedNum, setlikedNum] = useState(0);
  const [dislikedNum, setDislikedNum] = useState(0);
  const [likeList, setLikeList] = useState("");
  const [dislikeList, setDislikeList] = useState("");
  const [sharing, setSharing] = useState(false);
  const [openlikeList, setOpenlikeList] = useState(false);
  const [openDislikeList, setOpenDislikeList] = useState(false);
  const logginedUser = useLoggedInUser();
  const logginedID = localStorage.getItem("id");
  const navigate = useNavigate();
  const theme = useTheme();

  // 按钮初始化
  // 判断登陆用户是否已点赞点踩这篇帖子
  useEffect(() => {
    if (post && post.like_users && post.unlike_users) {
      const newLikeList = post.like_users === "" || post.like_users === null ? [] : post.like_users.slice(0,post.like_users.length-1).split(",");
      const newDislikeList = post.unlike_users === "" || post.unlike_users === null  ? []:post.unlike_users.slice(0,post.unlike_users.length-1).split(",");
      setLikeList(newLikeList);
      setDislikeList(newDislikeList);
      setlikedNum(post.likeNum);
      setDislikedNum(post.unlikeNum);
    }
  }, [post]);

  useEffect(() => {
    if (logginedID) {
      if (likeList.includes(logginedID.toString())) {
        setLiked(true);
      } else {
        setLiked(false);
      }
      if (dislikeList.includes(logginedID.toString())) {
        setDisliked(true);
      } else {
        setDisliked(false);
      }
    }
  }, [logginedID, likeList, dislikeList]);
  // 按钮初始化结束

  const handleLikeClick = () => {
    if (!logginedUser) {
      navigate('/login')
    } else {
      if (likeList.includes(logginedID.toString())) {
        cancelLike(post.id, logginedUser.id);
        setlikedNum(likedNum - 1);
        // #TODO 取消点赞 成功提示消息
      } else {
        addLike(post.id, logginedUser.id);
        setlikedNum(likedNum + 1);
        // #TODO 取消点踩 成功提示消息
      }
      setLiked(!liked);
    }
  }

  const handleDisLikeClick = () => {
    if (!logginedUser) {
      navigate('/login')
    } else {
      if (dislikeList.includes(logginedID.toString())) {
        cancelDislike(post.id, logginedUser.id);
        setDislikedNum(dislikedNum - 1);
        // #TODO 取消点踩 成功提示消息
      } else {
        addDislike(post.id, logginedUser.id);
        setDislikedNum(dislikedNum + 1);
        // #TODO 点踩 成功提示消息
      }
      setDisliked(!disliked);
    }
  }
  const handleShare = () => {
    setSharing(true);
  }
  const openLikeList = () => {
    setOpenlikeList(true);
  }
  const openDisLikeList = () => {
    setOpenDislikeList(true);
  }

  return (
    <div style={{ display: 'flex', alignContent: 'center', marginTop: '10px', gap: '10px' }}>
      <div style={{ display: 'flex', alignContent: 'center' }}>
      <div onClick={() => handleLikeClick()} >
        { liked
          ? <AiFillLike className="likesIcon" color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />
          : <AiOutlineLike className="likesIcon" color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />
        }
      </div>
      <div onClick={openLikeList} style={{ cursor: 'pointer'}}>
        { likedNum > 0
          ? <Typography variant='body2' align="left" fontWeight="bold" color="secondary">{likedNum}</Typography>
          : null}
      </div>
      </div>
      <div style={{ display: 'flex', alignContent: 'center' }}>
      <div onClick={() => handleDisLikeClick()} >
        {
         disliked
          ? <AiFillDislike className="dislikesIcon" color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />
          : <AiOutlineDislike className="dislikesIcon" color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />
        }
      </div>
      <div onClick={openDisLikeList} style={{ cursor: 'pointer'}}>
          { dislikedNum > 0
            ? <Typography variant='body2' align="left" fontWeight="bold" color="secondary" >{dislikedNum}</Typography>
            : null}
        </div>
      </div>
      <div onClick={handleShare} style={{ display: 'flex', alignContent: 'center' }}>
        <AiOutlineShareAlt color={theme.palette.secondary.main} size={theme.typography.body2.fontSize * 1.3} />
      </div>
      <DialogComponent
        isOpen={sharing}
        children={<ShareCard url={"http://localhost:3000/post/" + post.id} setSharing={setSharing} />}
      />
      <DialogComponent
        isOpen={openlikeList}
        children={<UserList titleText={"Who like this post:"} setCardOpen={setOpenlikeList} userList={likeList} logginedUser={logginedUser} />}
      />
      <DialogComponent
        isOpen={openDislikeList}
        children={<UserList titleText={"Who dislike this post:"} setCardOpen={setOpenDislikeList} userList={dislikeList} logginedUser={logginedUser} />}
      />
    </div>
  )
}

export default ReactionWrapper
