import axios from "axios"

const baseUrl = 'http://10.21.6.119:10000/notification'

const getHistoryMessages = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const historyMessages = response.data;
  return historyMessages && historyMessages.slice(0, 5);
};

export { getHistoryMessages }