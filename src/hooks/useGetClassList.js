import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useGetClassList() {
  return useQuery({
    queryKey: ['classList'],
    retry: false,
    queryFn: async () => {
      const response = await axios.get('/api/classes/list', {
        withCredentials: true,
      });

      return response.data;
    },
  });
}

export default useGetClassList;
