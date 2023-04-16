import { Typography } from '@mui/material';
import React from "react";
import Comment from "./Comment";

const CommentsBox = ({ comments }) => {

    //const commentsList = post.Comment;
    console.log(comments);
    const commentsList = comments;
    console.log(commentsList);

    // 现在想的是返回给你的是id, content, postid, userid, username, reply, 
    // reply是一个字典的list，有reply_id，comment_id, from_user, to_user, creation_date, content，
    // 然后是以时间顺序排序，最新的在最前面

    if(commentsList==null){
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    No comment so far
                </Typography>
            </div>
        )
    }
    else{
        return(
        <div>
            {commentsList.map((comment) => (
                <Comment comment={comment} />
            ))}
        </div>
        )
    }
}
export default CommentsBox