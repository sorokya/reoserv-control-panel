import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useGetItemList() {
  return useQuery({
    queryKey: ['itemList'],
    retry: false,
    queryFn: async () => {
      const response = await axios.get('/api/items/list', {
        withCredentials: true,
      });

      return response.data;
    },
  });
}

export default useGetItemList;
