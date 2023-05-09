import axios from 'axios'
const baseUrl = 'http://10.21.6.169/users/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }