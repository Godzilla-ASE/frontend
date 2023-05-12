import axios from 'axios'
import React, { useState } from 'react';
import './singlepost.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactionWrapper from '../../components/Wrapper/ReactionWrapper';
import SingleLineInput from '../../components/Inputs/SingleLineInput';
import MultiLineInput from '../../components/Inputs/MultiLineInput';
import SubmitButton from '../../components/Buttons/SubmitButton'
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { deletePost } from '../../services/post';
import { addComment, addReply } from '../../services/comment';

const CommentFooter = ({ post, user, replyComment }) => {
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();

  const postId = useParams().postId; //帖子ID
  const logginedUserId = user != null ? user.id : 0; // 登陆用户ID
  const postAuthorID = post.userid; // 帖子作者ID

  const handleSubmit = () => {
    if (!user) {
      navigate('/login');
    }
    const Now = new Date();

    if (commentText !== "") {
      if (replyComment.length !== 0) {
        const commentID = replyComment.id; // 评论ID
        addReply(logginedUserId, postAuthorID, commentID, commentText, Now);
        setCommentText(''); // 清空输入框
        // #TODO 添加回复成功提示消息
        navigate(`/post/${postId}`);
      } else {
        addComment(logginedUserId, postId, commentText, Now);
        setCommentText(''); // 清空输入框
        // #TODO 添加评论成功提示消息
        navigate(`/post/${postId}`);
      }
    }

  }

  const handlePostDelete = (postid) => {

    deletePost(postid);
    setTimeout(() => {
      navigate('/'); // Replace "/login" with the actual URL of your login page
    }, 1000);

    // #TODO 删除梯帖子成功提示消息
  }

  var placeholdertext = "Write your comments...";
  var buttontext = "Comment";
  if (replyComment.length !== 0) {
    placeholdertext = "Reply to " + replyComment.username;
    buttontext = "Reply";
  }

  return (
    <div>
      <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', padding: '5px' }}>
        <ReactionWrapper post={post} logginedUser={user} />
        {postAuthorID === logginedUserId ? <Button style={{ color: '#dd0000' }} onClick={() => handlePostDelete(postId)}>Delete Post</Button> : <div></div>}
      </div>
      <div style={{ display: 'flex' }}>
        <MultiLineInput placeholder={placeholdertext} value={commentText} handleChange={(e) => { setCommentText(e.target.value); }} />
        <SubmitButton buttontext={buttontext} onClick={handleSubmit} />
      </div>
    </div >
  )
}

export default CommentFooter