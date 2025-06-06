import http from '~/configs/httpService';

const baseUrl = 'api/history';

export const fetchHistory = async (page = 1, limit = 12) => {
  const response = await http.get(`${baseUrl}`, { params: { page, limit } });
  return response.data;
};

export const addHistory = async (payload: {
  movie_id: number;
  episode_id: number;
  progress_seconds: number;
  duration_seconds: number;
}) => {
  const response = await http.post(`${baseUrl}/create`, payload);
  return response.data;
};
