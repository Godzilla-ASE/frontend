import { useEffect, useState } from 'react';
import { getAll } from '../services/user';

export const useUsers = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAll()
      setData(data)
    }

    fetchData().catch(console.error)
  }, []);
  return data;
};