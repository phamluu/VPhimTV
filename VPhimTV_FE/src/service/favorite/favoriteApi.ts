import http from '~/configs/httpService';

const baseUrl = 'api/favorite';

export const fetchFavorites = async (page = 1, limit = 12) => {
  const response = await http.get(`${baseUrl}`, { params: { page, limit } });
  return response.data;
};

export const fetchCheckFavorite = async (movieId: number) => {
  const response = await http.get(`${baseUrl}/check`, { params: { movie_id: movieId } });
  return response.data;
};

export const addFavorite = async (movieId: number) => {
  const response = await http.post(`${baseUrl}/create`, { movie_id: movieId });
  return response.data;
};

export const deleteFavorite = async (movieId: number) => {
  const response = await http.post(`${baseUrl}/delete`, { movie_id: movieId });
  return response.data;
};
