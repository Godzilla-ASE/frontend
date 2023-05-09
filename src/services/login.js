import axios from 'axios'
const baseUrl = 'http://10.21.5.126/users/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }