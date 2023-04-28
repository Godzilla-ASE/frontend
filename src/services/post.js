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

export { getAll, getOne, createPost }
