import axios from 'axios'

const baseCommentUrl = 'http://localhost:3002/comments'

// const baseCommentUrl = 'http://localhost:9000/comments'
// const getPostComments = async (id) => {
//     const returnedComments = await axios.get(`${baseCommentUrl}/${id}`)
//     return returnedComments.data
//   }

const getPostComments = async () => {
    const returnedComments = await axios.get(`${baseCommentUrl}`)
    return returnedComments.data
  }
  
const deleteComment = async (commentId) => {
  const res = await axios.delete(`${baseCommentUrl}/${commentId}`)
  return res
}

const deleteReply = async (replyId) => {
  const res = await axios.delete(`${baseCommentUrl}/${replyId}`)
  return res
}

export { getPostComments, deleteComment, deleteReply }