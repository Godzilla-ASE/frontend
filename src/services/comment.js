import axios from 'axios'

//const baseCommentUrl = 'http://172.20.10.3:9000/comments'
const baseCommentUrl = 'http://10.21.6.112:9000/comments'


const getPostComments = async (postid) => {
  const returnedComments = await axios.get(`${baseCommentUrl}/${postid}`)
  // const returnedComments = await axios.get(`${baseCommentUrl}`)
  return returnedComments.data
}

const addComment = async (logginedUserId, postId, commentText, creationDate) => {

  console.log("addcommet发到了这个接口：", `${baseCommentUrl}`)
  console.log("评论：帖子id", postId, "内容", commentText, "日期", creationDate, "用户ID", logginedUserId);

  await axios.post(`${baseCommentUrl}`, {
    userid: logginedUserId,
    postid: postId,
    content: commentText,
    creation_Date: creationDate
  }).catch((error) => {
    console.error(error);
  });
}

const addReply = async (user_from, user_to, commentID, commentText, creationDate) => {
  console.log("addReply发到了这个接口：", `${baseCommentUrl}/reply`)
  console.log("回复：评论ID", commentID, "回复内容", commentText, "日期", creationDate, "FROM：", user_from, "TO:", user_to);

  await axios.post(`${baseCommentUrl}/reply`, {
    userid_from: user_from,
    userid_to: user_to,
    commentid: commentID,
    content: commentText,
    creation_Date: creationDate
  }).catch((error) => {
    console.error(error);
  });
}

const deleteComment = async (commentId) => {
  console.log("deleteComment发到了这个接口：", `${baseCommentUrl}/${commentId}`)
  const res = await axios.delete(`${baseCommentUrl}/${commentId}`)
  return res
}

const deleteReply = async (replyId) => {
  console.log("deleteReply发到了这个接口：", `${baseCommentUrl}/reply/${replyId}`)
  const res = await axios.delete(`${baseCommentUrl}/reply/${replyId}`)
  return res
}

export { getPostComments, addComment, addReply, deleteComment, deleteReply }