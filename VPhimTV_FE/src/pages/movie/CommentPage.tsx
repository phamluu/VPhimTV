import { ChevronDown, MoreVertical, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { createComment, createReply, dislikeComment, getComments, likeComment } from '../../service/movies/commentApi';

interface Reply {
  id: number;
  user: string;
  userInitials: string;
  time: string;
  content: string;
  likes: number;
  isLiked: boolean;
}

interface Comment {
  id: number;
  user: string;
  userInitials: string;
  time: string;
  content: string;
  likes: number;
  dislikes: number;
  replies: number;
  isLiked: boolean;
  isDisliked: boolean;
  repliesExpanded?: boolean;
  repliesList: Reply[];
}

const Comments = ({ movieId }: { movieId: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  // Giả định token lấy từ localStorage hoặc context
  const token = localStorage.getItem('authToken');
    useEffect(() => {
      console.log('movieId received in Comments:', movieId); // Debug ban đầu
    }, [movieId]);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Gọi API với movieId:', movieId); // Debug trước khi gọi API
      if (!movieId || movieId <= 0) {
        console.error('movieId không hợp lệ:', movieId);
        setError('movieId không hợp lệ. Vui lòng kiểm tra URL hoặc props.');
        return;
      }
      const res = await getComments(movieId, 1, 10);
      console.log('Phản hồi API:', res.data);
      const formattedComments: Comment[] = res.data.data.map((comment: any) => ({
        id: comment.id,
        user: `@${comment.user?.name || 'unknown'}`,
        userInitials: comment.user?.name?.charAt(0).toUpperCase() || 'U',
        content: comment.content,
        time: comment.created_at || 'Vừa xong',
        likes: comment.likes || 0,
        dislikes: comment.dislikes || 0,
        replies: comment.replies || 0,
        isLiked: comment.is_liked || false,
        isDisliked: comment.is_disliked || false,
        repliesExpanded: false,
        repliesList: comment.replies_list || [],
      }));
      setComments(formattedComments);
    } catch (err: any) {
      console.error('Lỗi API:', err.response?.data || err.message);
      setError(err.message || 'Không thể tải bình luận');
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, movieId]);

    useEffect(() => {
      fetchComments();
    }, [fetchComments, movieId]); // Thêm dependencies

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + ' N';
    }
    return num.toString();
  };

  const handleLike = async (commentId: number, isReply = false, parentId: number | null = null) => {
    try {
      await likeComment(commentId, token || '');
      if (isReply) {
        setComments(comments.map(comment =>
          comment.id === parentId
            ? {
                ...comment,
                repliesList: comment.repliesList.map(reply =>
                  reply.id === commentId
                    ? {
                        ...reply,
                        likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                        isLiked: !reply.isLiked,
                      }
                    : reply
                ),
              }
            : comment
        ));
      } else {
        setComments(comments.map(comment =>
          comment.id === commentId
            ? {
                ...comment,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                isLiked: !comment.isLiked,
                isDisliked: false,
              }
            : comment
        ));
      }
    } catch (err: any) {
      alert(err.message || 'Không thể thích bình luận');
    }
  };

  const handleDislike = async (commentId: number) => {
    try {
      await dislikeComment(commentId, token || '');
      setComments(comments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isDisliked: !comment.isDisliked,
              isLiked: false,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes,
            }
          : comment
      ));
    } catch (err: any) {
      alert(err.message || 'Không thể không thích bình luận');
    }
  };

  const toggleReplies = (commentId: number) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, repliesExpanded: !comment.repliesExpanded }
        : comment
    ));
  };

const handleSubmitComment = async () => {
  if (!newComment.trim()) return;

  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('Vui lòng đăng nhập để gửi bình luận!');
    return;
  }

  try {
    const data = { movie_id: movieId, content: newComment };
    const res = await createComment(data, token);
    console.log('Response from createComment:', res.data); // Debug response
    const newCommentData: Comment = {
      id: res.data.id,
      user: `@${res.data.user?.name || 'yourhandle'}`,
      userInitials: res.data.user?.name?.charAt(0).toUpperCase() || 'Y',
      content: res.data.content,
      time: 'Vừa xong',
      likes: 0,
      dislikes: 0,
      replies: 0,
      isLiked: false,
      isDisliked: false,
      repliesExpanded: false,
      repliesList: [],
    };
    setComments([newCommentData, ...comments]); // Cập nhật state
    setNewComment('');
  } catch (err: any) {
    console.error('Lỗi gửi bình luận:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Không thể gửi bình luận');
  }
};

  const handleSubmitReply = async (commentId: number) => {
    if (!replyText.trim()) return;

    try {
      const data = { movie_id: movieId, content: replyText, reply_to: commentId };
      const res = await createReply(commentId, data, token || '');
      const newReply: Reply = {
        id: res.data.id,
        user: `@${res.data.user?.name || 'yourhandle'}`,
        userInitials: res.data.user?.name?.charAt(0).toUpperCase() || 'Y',
        content: res.data.content,
        time: 'Vừa xong',
        likes: 0,
        isLiked: false,
      };
      setComments(comments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies + 1,
              repliesList: [...comment.repliesList, newReply],
              repliesExpanded: true,
            }
          : comment
      ));
      setReplyText('');
      setReplyTo(null);
    } catch (err: any) {
      alert(err.message || 'Không thể gửi phản hồi');
    }
  };

  if (loading) return <div>Đang tải bình luận...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="text-white min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">
            {comments.reduce((total, comment) => total + comment.replies + 1, 0).toLocaleString()} bình luận
          </h2>
          <div className="flex items-center gap-2 text-sm">
            <span>Sắp xếp theo</span>
          </div>
        </div>

        {/* Add Comment */}
        <div className="flex gap-3 mb-8">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-medium">
            Y
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Viết bình luận..."
              className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none pb-2 text-white placeholder-gray-400"
            />
            {newComment && (
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setNewComment('')}
                  className="px-4 py-2 text-gray-300 hover:bg-gray-800 rounded text-sm"
                >
                  HỦY
                </button>
                <button
                  onClick={handleSubmitComment}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white"
                  disabled={!newComment.trim()}
                >
                  BÌNH LUẬN
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {comment.userInitials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-300">{comment.user}</span>
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                <p className="text-white mb-2 leading-relaxed">{comment.content}</p>

                <div className="flex items-center gap-4 text-sm">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1 hover:bg-gray-800 px-2 py-1 rounded ${
                      comment.isLiked ? 'text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {comment.likes > 0 && formatNumber(comment.likes)}
                  </button>
                  <button
                    onClick={() => handleDislike(comment.id)}
                    className={`flex items-center gap-1 hover:bg-gray-800 px-2 py-1 rounded ${
                      comment.isDisliked ? 'text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    className="text-gray-300 hover:bg-gray-800 px-2 py-1 rounded"
                  >
                    Phản hồi
                  </button>
                  <button className="text-gray-300 hover:bg-gray-800 p-1 rounded">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Reply Input */}
                {replyTo === comment.id && (
                  <div className="flex gap-3 mt-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                      Y
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Viết phản hồi..."
                        className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none pb-2 text-white placeholder-gray-400 text-sm"
                        autoFocus
                      />
                      {replyText && (
                        <div className="flex justify-end gap-2 mt-3">
                          <button
                            onClick={() => { setReplyTo(null); setReplyText(''); }}
                            className="px-3 py-1 text-gray-300 hover:bg-gray-800 rounded text-xs"
                          >
                            HỦY
                          </button>
                          <button
                            onClick={() => handleSubmitReply(comment.id)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs text-white"
                            disabled={!replyText.trim()}
                          >
                            PHẢN HỒI
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Show Replies Button */}
                {comment.replies > 0 && (
                  <button
                    onClick={() => toggleReplies(comment.id)}
                    className="flex items-center gap-2 text-blue-400 hover:bg-gray-800 px-2 py-1 rounded mt-3 text-sm"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${comment.repliesExpanded ? 'rotate-180' : ''}`} />
                    {comment.repliesExpanded ? 'Ẩn' : `${comment.replies}`} phản hồi
                  </button>
                )}

                {/* Replies */}
                {comment.repliesExpanded && comment.repliesList.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {comment.repliesList.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-xs">
                          {reply.userInitials}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-300">{reply.user}</span>
                            <span className="text-xs text-gray-500">{reply.time}</span>
                          </div>
                          <p className="text-white mb-2 text-sm leading-relaxed">{reply.content}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <button
                              onClick={() => handleLike(reply.id, true, comment.id)}
                              className={`flex items-center gap-1 hover:bg-gray-800 px-2 py-1 rounded ${
                                reply.isLiked ? 'text-blue-400' : 'text-gray-300'
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              {reply.likes > 0 && reply.likes}
                            </button>
                            <button className="flex items-center gap-1 hover:bg-gray-800 px-2 py-1 rounded text-gray-300">
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                            <button className="text-gray-300 hover:bg-gray-800 px-2 py-1 rounded text-xs">
                              Phản hồi
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
