import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/comment',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lấy danh sách comment theo movie_id, pagination, sorting
export const getComments = (movie_id: number, page: number = 1, limit: number = 10) => {
  return apiClient.get('/', {
    params: { movie_id, page, limit },
  });
};

// Tạo comment mới (phải có token xác thực)
export const createComment = (data: { movie_id: number; content: string }, token: string) => {
  return apiClient.post('/create', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Tạo reply mới
export const createReply = (_commentId: number, data: { movie_id: number; content: string; reply_to: number }, token: string) => {
  return apiClient.post('/create', data, {
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
