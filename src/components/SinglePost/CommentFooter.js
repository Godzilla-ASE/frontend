import { Grid, Button, TextField} from '@mui/material';
import React, { useState } from 'react';
import './singlepost.css';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike, AiOutlineShareAlt } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

const CommentFooter = ({ post, user }) => {
  const postId = useParams().postId;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const navigate = useNavigate();
  const postlink = "http://post/"+postId
    
  const handleLikeClick = () => {
      // update it to communicate with the server
      if (user == null) {
        navigate("/login");
      }
      setLiked(!liked);
    }
    
  const handleDisLikeClick = () => {
    // update it to communicate with the server
    if (user == null) {
      navigate("/login");
    }
    setDisliked(!disliked);
  }
  const handleShare = () => {
    // update it to communicate with the server
    document.getElementById('shareLink').style.display = 'block';
  }

    return(
        <div>
          <Grid container spacing={2} alignItems="center" xs={12}>
              <Grid item style={{ paddingTop: '3%'}}>
                  {/* <ReactionWrapper post={postData} user={user}/> */}
                  <div className="likesWrapper" onClick={handleLikeClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {liked ? <AiFillLike className="likesIcon" color="#FF4136" size={25} /> : <AiOutlineLike className="likesIcon" color="#818181" size={25} />}
                      {post.like > 0 ? <span className="likesCount">{post.like}</span> : null}
                  </div>
              </Grid>
              <Grid item style={{ paddingTop: '3%' }}>
                  <div className="dislikesWrapper" onClick={handleDisLikeClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {disliked ? <AiFillDislike className="dislikesIcon" color="#FF4136" size={25} /> : <AiOutlineDislike className="dislikesIcon" color="#818181" size={25} />}
                      {post.unlike > 0 ? <span className="dislikesCount">{post.unlike}</span> : null}
                  </div>
              </Grid>
              <Grid item style={{ paddingTop: '3%' }}>
                  <div className="shareWrapper" onClick={handleShare}>
                      {<AiOutlineShareAlt className="" color="#818181" size={25} />}
                  </div>
              </Grid>
              <Grid item style={{ paddingTop: '3%' }}>
                  <div id="shareLink" className="shareWrapper" style={{display:'none'}}> 
                    <input type="text" value={"Copy to share: "+postlink} readonly disabled style={{backgroundColor: '#f0f0f0', width: "100%"}} />
                  </div>
              </Grid>
          </Grid>
          <br></br>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} style={{ paddingTop: '1%' }}>
                <div style={{ display: 'flex' }}>
                    <TextField label="Say something" variant="outlined" fullWidth />
                    <Button variant="contained" color="primary" style={{ left: '15px' }} >Comment</Button>
                </div>
            </Grid>
        </Grid>
      </div>
    )
}
export default CommentFooter