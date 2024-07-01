import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useGetNpcList() {
  return useQuery({
    queryKey: ['npcList'],
    retry: false,
    queryFn: async () => {
      const response = await axios.get('/api/npcs/list', {
        withCredentials: true,
      });

      return response.data;
    },
  });
}

export default useGetNpcList;
