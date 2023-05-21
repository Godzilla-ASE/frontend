import { useEffect, useState } from 'react';
import { getAllByTag } from '../services/post';

export const usePostsByTag = (tag) => {
  console.log('tag',tag)
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllByTag(tag)
      setData(data)
    }

    fetchData().catch(console.error)
  }, []);

  return data;
};
