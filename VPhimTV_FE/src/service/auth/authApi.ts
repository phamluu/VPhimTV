import http from '~/configs/httpService';

const baseURL = 'api/auth';

export const checkUser = async () => {
  const res = await http.get(`/${baseURL}/check`);
  return res.data;
};

export async function loginUser(username: string, password: string) {
  const res = await http.post(`/${baseURL}/login`, { email: username, password });
  return res.data;
}

export async function registerUser(name: string, email: string, password: string) {
  const res = await http.post(`/${baseURL}/register`, { name, email, password });
  return res.data;
}

export async function logoutUser() {
  const res = await http.post(`/${baseURL}/logout`);
  return res.data;
}
