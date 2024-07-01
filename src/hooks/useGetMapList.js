import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useGetMapList() {
  return useQuery({
    queryKey: ['mapList'],
    retry: false,
    queryFn: async () => {
      const response = await axios.get('/api/maps/list', {
        withCredentials: true,
      });

      return response.data;
    },
  });
}

export default useGetMapList;
