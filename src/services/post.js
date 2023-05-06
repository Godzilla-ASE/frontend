import axios from 'axios'
const baseUrl = 'http://172.20.10.3:9000/posts'

// axios.defaults.withCredentials = true;

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getAllByLocation = async location => {
  const response = await axios.post(`${baseUrl}/location/`, location)
  return response.data
}

const getAllByTag = async tag => {
  const response = await axios.post(`${baseUrl}/tag/`, tag)
  return response.data
}

const getOne = async (id) => {
  const returnedPost = await axios.get(`${baseUrl}/${id}`)
  return returnedPost.data
}

const createPost = async newPost => {
  await axios.post(baseUrl, newPost)
}

const deletePost = async (postid) => {
  const res = await axios.delete(`${baseUrl}/${postid}`)
  return res
}

const getPostsByUserID = async (id) => {
  const returnedPost = await axios.get(`${baseUrl}/users/${id}`)
  return returnedPost.data
}

const addLike = async (postID, userID) => {
  const response = await axios.put(`${baseUrl}/attitude`, {
    userid: userID,
    postid: postID,
    attitude_type: true,
    isCancel: false
  });
  return response
}

const cancelLike = async (postID, userID) => {
  const response = await axios.put(`${baseUrl}/attitude`, {
    userid: userID,
    postid: postID,
    attitude_type: true,
    isCancel: true
  });
  return response
}
const addDislike = async (postID, userID) => {
  const response = await axios.put(`${baseUrl}/attitude`, {
    userid: userID,
    postid: postID,
    attitude_type: false,
    isCancel: false
  });
  return response
}

const cancelDislike = async (postID, userID) => {
  const response = await axios.put(`${baseUrl}/attitude`, {
    userid: userID,
    postid: postID,
    attitude_type: false,
    isCancel: true
  });
  return response
}

export { getAll, getOne, getPostsByUserID, createPost, addLike, cancelLike, addDislike, cancelDislike, getAllByLocation, getAllByTag, deletePost }
