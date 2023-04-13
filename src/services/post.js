import axios from 'axios'
// const baseUrl = 'http://localhost:9000/posts'
const baseUrl = 'http://localhost:3001/posts'
const baseCommentUrl = 'http://localhost:9000/comments'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const returnedPost = await axios.get(`${baseUrl}/${id}`)
  // const returnedPost = await axios.get(`http://localhost:3000/db.json`)
  return returnedPost.data
}

const getPostComments = async (id) => {
  const returnedComments = await axios.get(`${baseCommentUrl}/${id}`)
  return returnedComments.data
}

export { getAll, getOne, getPostComments }
