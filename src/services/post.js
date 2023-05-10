import axios from 'axios'
const baseUrl = 'http://10.21.6.119:9000/posts'


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getAllByLocation = async location => {
  const requestLocation = {
    location: location
  }
  const response = await axios.post(`${baseUrl}/location`, requestLocation)
  return response.data
}

const getAllByTag = async tag => {
  const response = await axios.get(`${baseUrl}/tags/${tag}`,)
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

const addLike = async (postID, id) => {
  const response = await axios.put(`${baseUrl}/attitude`, {
    userid: id,
    postid: postID,
    attitude_type: true,
    isCancel: false
  });
  return response
}

const cancelLike = async (postID, id) => {
  const response = await axios.put(`${baseUrl}/attitude`, {
    userid: id,
    postid: postID,
    attitude_type: true,
    isCancel: true
  });
  return response
}
const addDislike = async (postID, id) => {
  const response = await axios.put(`${baseUrl}/attitude`, {
    userid: id,
    postid: postID,
    attitude_type: false,
    isCancel: false
  });
  return response
}

const cancelDislike = async (postID, id) => {
  const response = await axios.put(`${baseUrl}/attitude`, {
    userid: id,
    postid: postID,
    attitude_type: false,
    isCancel: true
  });
  return response
}

export { getAll, getOne, getPostsByUserID, createPost, addLike, cancelLike, addDislike, cancelDislike, getAllByLocation, getAllByTag, deletePost }
