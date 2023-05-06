import axios from "axios"

const baseUrl = 'http://10.28.54.76:10000/notification'

const getHistoryMessages = async (userID) => {
  const response = await axios.get(`${baseUrl}/${userID}`);
  const historyMessages = response.data;
  return historyMessages && historyMessages.slice(0, 5);
};

export { getHistoryMessages }