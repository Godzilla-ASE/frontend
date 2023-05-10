import axios from 'axios'

//const baseCommentUrl = 'http://172.20.10.3:9000/comments'
const baseCommentUrl = 'http://10.21.10.220:9000/comments'


const getPostComments = async (postid) => {
  const returnedComments = await axios.get(`${baseCommentUrl}/${postid}`)
  // const returnedComments = await axios.get(`${baseCommentUrl}`)
  return returnedComments.data
}

const addComment = async (logginedUserId, postId, commentText, creationDate) => {

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
  const res = await axios.delete(`${baseCommentUrl}/${commentId}`)
  return res
}

const deleteReply = async (replyId) => {
  const res = await axios.delete(`${baseCommentUrl}/reply/${replyId}`)
  return res
}

export { getPostComments, addComment, addReply, deleteComment, deleteReply }