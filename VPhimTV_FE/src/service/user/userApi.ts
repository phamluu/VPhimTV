import http from '~/configs/httpService';

const baseUrl = 'api/user';

export const fetchUser = async (id: number) => {
  const response = await http.get(`${baseUrl}/${id}`);
  return response.data;
};

export const updateUser = async (payload: { id: number; name?: string; avatar?: string }) => {
  const response = await http.put(`${baseUrl}/${payload.id}`, payload);
  return response.data;
};
