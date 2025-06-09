import http from '~/configs/httpService';

const baseurl = 'api/comment';

export const fetchComments = async (params: { movie_id: number; reply_to?: number; page?: number; limit?: number }) => {
  const response = await http.get(`${baseurl}`, { params });
  return response.data;
};

export const createComment = async (payload: { movie_id: number; reply_to?: number; content: string }) => {
  const response = await http.post(`${baseurl}/create`, payload);
  return response.data;
};
