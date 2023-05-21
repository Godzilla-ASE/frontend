import { useEffect, useContext } from 'react';
import { getHistoryMessages } from '../services/message';
import { MessageContext } from '../context/MessageContext';

export const useHistoryMessages = (user) => {
  const { dispatch } = useContext(MessageContext)

  useEffect(() => {
    const id = user.id
    const fetchData = async () => {
      const data = await getHistoryMessages(id)
      console.log('history', data)
      dispatch({ type: "SET_HISTORY", data })

    }
    fetchData().catch(console.error)
  }, []);

};
