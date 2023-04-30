import axios from 'axios'
// const baseUrl = 'http://localhost:9000/posts'
const baseUrl = 'http://localhost:3001/posts'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const returnedPost = await axios.get(`${baseUrl}/${id}`)
  return returnedPost.data
}

const createPost = async (data) => { }

const addLike = async (postID,userID) => {
  const response = await axios.put(`${baseUrl}/attitude`,{
    userid: userID,
    postid: postID,
    attitude_type: true,
    isCancel: false
  });
  return response
}

const cancelLike = async (postID,userID) => {
  const response = await axios.put(`${baseUrl}/attitude`,{
    userid: userID,
    postid: postID,
    attitude_type: true,
    isCancel: true
  });
  return response
}
const addDislike = async (postID,userID) => {
  const response = await axios.put(`${baseUrl}/attitude`,{
    userid: userID,
    postid: postID,
    attitude_type: false,
    isCancel: false
  });
  return response
}

const cancelDislike = async (postID,userID) => {
  const response = await axios.put(`${baseUrl}/attitude`,{
    userid: userID,
    postid: postID,
    attitude_type: false,
    isCancel: true
  });
  return response
}

export { getAll, getOne, createPost, addLike, cancelLike, addDislike, cancelDislike}
