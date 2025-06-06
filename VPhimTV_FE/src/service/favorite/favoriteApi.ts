import http from '~/configs/httpService';

const baseUrl = 'api/favorite';

export const fetchCheckFavorite = async (movieId: number) => {
  const response = await http.get(`${baseUrl}/check`, { params: { movie_id: movieId } });
  return response.data;
};

export const addFavorite = async (movieId: number) => {
  const response = await http.post(`${baseUrl}/create`, { movie_id: movieId });
  return response.data;
};
