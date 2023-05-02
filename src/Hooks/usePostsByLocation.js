import { useEffect, useState } from 'react';
import { getAllByLocation } from '../services/post';

export const usePostsByLocation = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllByLocation()
      setData(data)
    }

    fetchData().catch(console.error)
  }, []);

  return data;
};
