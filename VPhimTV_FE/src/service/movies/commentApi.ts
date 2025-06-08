import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
      withCredentials: true,
});

export const getComments = (movieId: number, page: number = 1, limit: number = 10, token?: string) => {
  console.log('Token:', token);
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return apiClient.get('/comment', {
    params: { movie_id: movieId, page, limit },
    headers,
  });
};

export const createComment = async (data: { movie_id: number; content: string }, token: string) => {
  try {
    const response = await apiClient.post('/comment/create', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Lỗi tạo bình luận:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Không thể tạo bình luận');
  }
};

export const createReply = async (commentId: number, data: { movie_id: number; content: string; reply_to: number }, token: string) => {
  try {
    const response = await apiClient.post('/comment/reply', { ...data, comment_id: commentId }, { // Sử dụng endpoint riêng
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Lỗi tạo phản hồi:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Không thể tạo phản hồi');
  }
};

// Like comment hoặc reply
export const likeComment = async (commentId: number, token: string) => {
  try {
    const response = await apiClient.post(`/comment/like/${commentId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Lỗi thích bình luận:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Không thể thích bình luận');
  }
};

// Dislike comment
export const dislikeComment = async (commentId: number, token: string) => {
  try {
    const response = await apiClient.post(`/comment/dislike/${commentId}`, {}, { // Đổi sang POST nếu phù hợp với route
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Lỗi không thích bình luận:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Không thể không thích bình luận');
  }
};
