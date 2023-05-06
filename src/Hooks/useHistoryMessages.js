import { useEffect, useState, useContext } from 'react';
import { getHistoryMessages } from '../services/message';
import { MessageContext } from '../context/MessageContext';

export const useHistoryMessages = (user) => {
  const { state, dispatch } = useContext(MessageContext)

  useEffect(() => {
    const userID = user.userID
    const fetchData = async () => {
      const data = await getHistoryMessages(userID)
      dispatch({ type: "SET_HISTORY", data })

    }
    console.log('???')
    fetchData().catch(console.error)
  }, []);

};
