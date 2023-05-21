import {Typography} from '@mui/material';
import CommentsBox from './CommentsBox';

const PostContent = ({post, comments, loginedUserID, onreplyCommentChange}) => {
  return (
    <div className="scrollable-container">
      <Typography variant="h2" color="primary">
        {post.title != null ? post.title : "NULL title"}
      </Typography>
      <br></br>
      <Typography variant="body1" color="primary" style={{textAlign: 'justify'}}>
        {post.content_text != null ? post.content_text : "NULL text"}
      </Typography>
      <br></br>
      <br></br>
      <Typography variant="h3" color="secondary" gutterBottom>
        Comments
      </Typography>
      <CommentsBox comments={comments} loginedUserID={loginedUserID} onreplyCommentChange={onreplyCommentChange}/>
    </div>
  )
}
export default PostContent