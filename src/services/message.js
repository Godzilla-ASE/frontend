import axios from "axios"

const baseUrl = 'http://172.20.10.3:10000/notification'

const getHistoryMessages = async (userID) => {
  const response = await axios.get(`${baseUrl}/${userID}`);
  const historyMessages = response.data;
  return historyMessages && historyMessages.slice(0, 5);
};

export { getHistoryMessages }