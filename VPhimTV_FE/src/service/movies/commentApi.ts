import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getComments = (movieId: number, page: number = 1, limit: number = 10, token?: string) => {
  console.log('Token:', token);
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return apiClient.get('/comment', {
    params: { movie_id: movieId, page, limit },
    headers,
  });
};

export const createComment = (data: { movie_id: number; content: string }, token: string) => {
  console.log('Sending request with token:', token);
  return apiClient.post('/comment/create', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createReply = (_commentId: number, data: { movie_id: number; content: string; reply_to: number }, token: string) => {
  return apiClient.post('/comment/create', data, { // Có thể cần endpoint riêng cho reply, ví dụ: /comment/reply
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Like comment hoặc reply
export const likeComment = (commentId: number, token: string) => {
  return apiClient.put(`/like/${commentId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Dislike comment
export const dislikeComment = (commentId: number, token: string) => {
  return apiClient.put(`/dislike/${commentId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
