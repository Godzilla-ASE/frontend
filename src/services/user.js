import axios from 'axios'

const baseUserUrl = 'http://10.21.6.192:8080/users'
//const baseUserUrl = 'http://172.20.10.4:8080/users'


const getOneUserInfo = async (id) => {
  const returnedUser = await axios.get(`${baseUserUrl}/${id}`)
  return returnedUser.data
}

const addFollower = async (logginedUserId, authorID, logginedUserToken) => {
  const response = await axios.post(`${baseUserUrl}/${logginedUserId}/follow/${authorID}`);
  return response
}

const cancelFollower = async (logginedUserId, authorID, logginedUserToken) => {
  console.log("发到了这个接口：", `${baseUserUrl}/${logginedUserId}/follow`)
  const response = await axios.put(`${baseUserUrl}/${logginedUserId}/follow/${authorID}`);

  return response
}

const getAll = async () => {
  const response = await axios.get(`${baseUserUrl}`)
  return response.data
}

export { getOneUserInfo, addFollower, cancelFollower, getAll }