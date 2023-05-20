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

  const postId = useParams().postId; 
  const logginedUserId = user != null ? user.id : 0;
  const postAuthorID = post.userid;

  const handleSubmit = () => {
    if (!user) {
      navigate('/login');
    }
    const Now = new Date();

    if (commentText !== "") {
      if (replyComment.length !== 0) {
        const commentID = replyComment.id; 
        addReply(logginedUserId, postAuthorID, commentID, commentText, Now);
        setCommentText(''); 
        navigate(`/post/${postId}`);
      } else {
        addComment(logginedUserId, postId, commentText, Now);
        setCommentText(''); 
        navigate(`/post/${postId}`);
      }
    }

  }

  const handlePostDelete = (postid) => {

    deletePost(postid);
    setTimeout(() => {
      navigate('/');
    }, 1000);

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