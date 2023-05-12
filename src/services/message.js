import axios from "axios"

const baseUrl = 'http://localhost:8083/notification'

const getHistoryMessages = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const historyMessages = response.data;
  return historyMessages.filter(message => message.userid_from !== message.userid_to);
};

export { getHistoryMessages }