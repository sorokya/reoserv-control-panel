import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useGetMap({ id }) {
  return useQuery({
    queryKey: [`map${id}`],
    retry: false,
    queryFn: async () => {
      const response = await axios.get(`/api/maps/${id}`, {
        withCredentials: true,
      });

      return response.data;
    },
  });
}

export default useGetMap;
