import AuthorWrapper from '../Wrapper/AuthorWrapper';
import { Typography } from '@mui/material';
import CommentsBox from './CommentsBox';

const PostContent = ({ post, comments }) => {
  console.log(comments);

  return (
    // ｜-- PostContent（这篇post的内容）
    //        |-- <div> (这里面的内容可以上下滑动)
    //            |-- Typography 
    //            |-- Typography
    //            |-- Typography (几个并排的文字信息：时间标题帖子内容)
    //            |-- CommentsBox (用来放这篇帖子的n条评论)
    //                |-- Comments 1
    //                    |-- Reply 1.1
    //                    ...
    //                |-- Comments 2
    //                    |-- Reply 2.1
    //                    ...
    //                ...
    //        |-- </div> (这里面的内容可以上下滑动)
    <div className="scrollable-container">
      <Typography variant="body2" color="secondary">
        Publish Date: {post.creation_date != null ? post.creation_date : "NULL Date"}
      </Typography>
      <Typography variant="h2" color="primary">
        {post.title != null ? post.title : "NULL title"}
      </Typography>
      <br></br>
      <Typography variant="body1" color="primary" style={{ textAlign: 'justify' }}>
        {post.content_text != null ? post.content_text : "NULL text"}
      </Typography>
      <br></br>
      <br></br>
      <Typography variant="h3" color="secondary" gutterBottom>
        Comments
      </Typography>
      <CommentsBox comments={comments} />
    </div>
  )
}
export default PostContent