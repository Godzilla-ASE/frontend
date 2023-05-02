import React, { createContext, useReducer, useContext } from 'react'

export const PostContext = createContext()

const initialState = {
  loading: true,
  error: null,
  posts: null
}

function postReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      };
    case "SET_POSTS":
      return {
        ...state,
        loading: false,
        posts: action.data,
      };
    case "CREATE_POST":
      console.log('CREATED!!!', action)
      return {
        ...state,
        posts: [action.newPost, ...state.posts],
      };
    default:
      return state;
  }
}

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePostValue = () => {
  const postAndDispatch = useContext(PostContext)
  return postAndDispatch.state
}