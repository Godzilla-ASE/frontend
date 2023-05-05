import React, { createContext, useReducer, useContext } from 'react'

export const MessageContext = createContext()

const initialState = {
  messages: []
}

function messageReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_HISTORY":
      return {
        ...state,
        messages: action.data,
      };
    case "NEW_MESSAGE":
      console.log('NEW MESSAGE!!!', action)
      return {
        ...state,
        messages: [action.newMessage, ...state.messages],
      };
    default:
      return state;
  }
}

export function MessageProvider({ children }) {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  return (
    <MessageContext.Provider value={{ state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
}

export const useMessageValue = () => {
  const messageAndDispatch = useContext(MessageContext)
  return messageAndDispatch.state
}