import { Grid, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import './singlepost.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactionWrapper from '../Wrapper/ReactionWrapper';
import SingleLineInput from '../Inputs/SingleLineInput';
import SubmitButton from '../Buttons/SubmitButton';

const CommentFooter = ({ post, user }) => {
  const postId = useParams().postId;
  const navigate = useNavigate();
  const postlink = "http://post/" + postId // #TODO Edit this id

  const handleShare = () => {
    // update it to communicate with the server
    document.getElementById('shareLink').style.display = 'block';
  }

  return (
    <div>
      <ReactionWrapper post={post} />
      {/* <Grid item style={{ paddingTop: '3%' }}>
        <div id="shareLink" className="shareWrapper" style={{ display: 'none' }}>
          <input type="text" value={"Copy to share: " + postlink} readonly disabled style={{ backgroundColor: '#f0f0f0', width: "100%" }} />
        </div>
      </Grid> */}
      <div style={{ display: 'flex' }}>
        <SingleLineInput placeholder="Write your comments..." />
        <SubmitButton buttontext="Comment" />
      </div>
    </div >
  )
}
export default CommentFooter