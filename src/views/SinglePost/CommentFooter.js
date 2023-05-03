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

const CommentFooter = ({ post, user, replyComment }) => {
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();

  const postId = useParams().postId; //帖子ID
  const logginedUserId = user.userID != null ? user.userID : 0; // 登陆用户ID
  const postAuthorID = post.userid; // 帖子作者ID

  const addReply = async () => {
    const commentID = replyComment.id; // 评论ID

    const Now = new Date().toISOString();
    const year = new Date(Now).getFullYear();
    const month = new Date(Now).getMonth() + 1;
    const day = new Date(Now).getDate();
    const creationDate = year+"-"+month+"-"+day;

    try {
      await axios.post('http://localhost:9000/comments/reply', {
        userid_from: logginedUserId,
        userid_to: postAuthorID,
        commentid: commentID,
        content: commentText,
        creation_date: creationDate
      });
      console.log("回复：评论ID",commentID ,"内容", commentText,"日期", creationDate,"FROM：", logginedUserId, "TO:",postAuthorID);
      setCommentText(''); // 清空输入框
      } catch (error) {
        console.error(error);
      }
  }

  const addComment = async () => {
    const Now = new Date().toISOString();
    const year = new Date(Now).getFullYear();
    const month = new Date(Now).getMonth() + 1;
    const day = new Date(Now).getDate();
    const creationDate = year+"-"+month+"-"+day;

    try {
      await axios.post('http://localhost:9000/comments', {
        userid: logginedUserId,
        postid: postId,
        content: commentText,
        creation_date: creationDate,
      });
      console.log("评论：帖子id",postId,"内容", commentText,"日期", creationDate,"用户ID", logginedUserId);
      setCommentText(''); // 清空输入框
      } catch (error) {
        console.error(error);
      }
  }

  const handleSubmit = () => {
    // update it to communicate with the server
    if(!user){
      navigate('/login');
    }
    if(replyComment.length !== 0 && commentText !== ""){
      addReply();
    }else if(commentText !== ""){
      addComment();
    }
  }

  const handlePostDelete = (postid) =>{
    deletePost(postid);
  }

  var placeholdertext = "Write your comments...";
  if(replyComment.length !== 0){
    placeholdertext = "Reply to " + replyComment.username;
  }
  console.log(postAuthorID,logginedUserId);
  console.log(postAuthorID===logginedUserId);
  return (
    <div>
      <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', padding: '5px'}}>
      <ReactionWrapper post={post} logginedUser = {user} />
        {postAuthorID===logginedUserId ? <Button style={{color:'#dd0000'}} onClick={() => handlePostDelete(postId)}>Delete Post</Button> : <div></div>}
      </div>
      <div style={{ display: 'flex' }}>
        <MultiLineInput placeholder={placeholdertext} value={commentText} handleChange={(e) => {setCommentText(e.target.value);}}/>
        <SubmitButton buttontext="Comment" onClick={handleSubmit}/>
      </div>
    </div >
  )
}

export default CommentFooter