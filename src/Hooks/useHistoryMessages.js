import { useEffect, useState, useContext } from 'react';
import { getHistoryMessages } from '../services/message';
import { MessageContext } from '../context/MessageContext';

export const useHistoryMessages = (user) => {
  const { state, dispatch } = useContext(MessageContext)

  useEffect(() => {
    if (user) {
      const userID = user.userID
      const fetchData = async () => {
        const data = await getHistoryMessages(userID)
        dispatch({ type: "SET_HISTORY", data })

      }

      fetchData().catch(console.error)
    }

  }, [user]);

};
