import http from '~/configs/httpService';

const baseUrl = 'api/view';

export const addView = async (episode_id: number) => {
  const response = await http.post(`${baseUrl}/create`, { episode_id });
  return response.data;
};
