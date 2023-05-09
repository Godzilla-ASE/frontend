import { useEffect, useState } from 'react';
import { getAllByLocation } from '../services/post';

export const usePostsByLocation = (location) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllByLocation(location)
      setData(data)
    }

    fetchData().catch(console.error)
  }, []);

  return data;
};
