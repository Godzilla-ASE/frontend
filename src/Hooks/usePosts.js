import { useEffect, useState, useContext } from 'react';
import { getAll } from '../services/post';
import { PostContext } from '../context/PostContext';

export const usePosts = () => {
  const [data, setData] = useState(null);
  const { state, dispatch } = useContext(PostContext)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAll()
      setData(data)
      dispatch({ type: "SET_POSTS", data })
    }

    fetchData().catch(console.error)
  }, []);
  return data;
};