import { useEffect, useState } from 'react';
import { getAllByTag } from '../services/post';

export const usePostsByTag = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllByTag()
      setData(data)
    }

    fetchData().catch(console.error)
  }, []);

  return data;
};
