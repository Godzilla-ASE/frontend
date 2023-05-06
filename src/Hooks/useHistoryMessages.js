import { useEffect, useState, useContext } from 'react';
import { getHistoryMessages } from '../services/message';
import { MessageContext } from '../context/MessageContext';

export const useHistoryMessages = (userID) => {
  // const [data, setData] = useState(null);
  const { state, dispatch } = useContext(MessageContext)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistoryMessages(userID)
      dispatch({ type: "SET_HISTORY", data })
      // setData(data)
    }

    fetchData().catch(console.error)
  }, []);

  // return data;
};
