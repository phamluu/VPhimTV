import http from '~/configs/httpService';

const baseUrl = 'api/user';

export const fetchUser = async (id: number) => {
  const response = await http.get(`${baseUrl}/${id}`);
  return response.data;
};

export const updateUser = async (payload: { id: number; full_name?: string; avatar?: File }) => {
  const formData = new FormData();
  if (payload.avatar) formData.append('avatar', payload.avatar);
  if (payload.full_name) formData.append('full_name', payload.full_name);

  const response = await http.post(`${baseUrl}/update/${payload.id}`, formData);

  return response.data;
};
