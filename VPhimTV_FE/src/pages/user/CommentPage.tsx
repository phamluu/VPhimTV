import { useState } from 'react';

const MovieComments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Minh Tuấn',
      avatar: 'https://ui-avatars.com/api/?name=Minh+Tuan&background=4f46e5&color=fff',
      content: 'Phim hay quá! Diễn xuất tự nhiên và kịch bản cuốn hút. Đáng xem!',
      time: '2 giờ trước',
      likes: 12,
      replies: [
        {
          id: 11,
          user: 'Thu Hà',
          avatar: 'https://ui-avatars.com/api/?name=Thu+Ha&background=059669&color=fff',
          content: 'Mình cũng thấy vậy, đặc biệt là phần cuối rất cảm động',
          time: '1 giờ trước',
          likes: 3
        }
      ]
    },
    {
      id: 2,
      user: 'Hoàng Nam',
      avatar: 'https://ui-avatars.com/api/?name=Hoang+Nam&background=dc2626&color=fff',
      content: 'CGI đẹp mắt, âm thanh sống động. Tuy nhiên cốt truyện hơi dài dòng một chút.',
      time: '4 giờ trước',
      likes: 8,
      replies: []
    },
    {
      id: 3,
      user: 'Linh Chi',
      avatar: 'https://ui-avatars.com/api/?name=Linh+Chi&background=7c2d12&color=fff',
      content: 'Xem cùng gia đình rất vui. Phim phù hợp mọi lứa tuổi.',
      time: '6 giờ trước',
      likes: 15,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: 'Bạn',
        avatar: 'https://ui-avatars.com/api/?name=Ban&background=6366f1&color=fff',
        content: newComment,
        time: 'Vừa xong',
        likes: 0,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleSubmitReply = (commentId) => {
    if (replyText.trim()) {
      const reply = {
        id: Date.now(),
        user: 'Bạn',
        avatar: 'https://ui-avatars.com/api/?name=Ban&background=6366f1&color=fff',
        content: replyText,
        time: 'Vừa xong',
        likes: 0
      };
      setComments(comments.map(comment =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      ));
      setReplyText('');
      setReplyTo(null);
    }
  };

  const handleLike = (
    commentId: number,
    isReply: boolean = false,
    parentId: number | null | undefined = null
  ) => {
    if (isReply && parentId) {
      setComments(comments.map(comment =>
        comment.id === parentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      ));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-base-content mb-4">
          Bình luận ({comments.length})
        </h2>
        <div className="mb-6">
          <div className="flex gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://ui-avatars.com/api/?name=Ban&background=6366f1&color=fff" alt="Your avatar" />
              </div>
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                className="textarea textarea-bordered w-full resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSubmitComment}
                  className="btn btn-primary btn-sm"
                  disabled={!newComment.trim()}
                >
                  Gửi bình luận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-base-200 pb-6">
            <div className="flex gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={comment.avatar} alt={comment.user} />
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-base-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-base-content">{comment.user}</h4>
                    <span className="text-xs text-base-content/60">{comment.time}</span>
                  </div>
                  <p className="text-base-content">{comment.content}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-1 text-base-content/70 hover:text-primary transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7v13m-3-4l-2-2m0 0l2-2m-2 2h12" />
                    </svg>
                    {comment.likes}
                  </button>
                  <button
                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    Trả lời
                  </button>
                </div>

                {replyTo === comment.id && (
                  <div className="flex gap-2 mt-3">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img src="https://ui-avatars.com/api/?name=Ban&background=6366f1&color=fff" alt="Your avatar" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Viết phản hồi..."
                        className="textarea textarea-bordered textarea-sm w-full resize-none"
                        rows={2}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleSubmitReply(comment.id)}
                          className="btn btn-primary btn-xs"
                          disabled={!replyText.trim()}
                        >
                          Gửi
                        </button>
                        <button
                          onClick={() => {setReplyTo(null); setReplyText('');}}
                          className="btn btn-ghost btn-xs"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {comment.replies.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-2 ml-4">
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img src={reply.avatar} alt={reply.user} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-base-300 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium text-sm text-base-content">{reply.user}</h5>
                              <span className="text-xs text-base-content/60">{reply.time}</span>
                            </div>
                            <p className="text-sm text-base-content">{reply.content}</p>
                          </div>
                          <button
                            onClick={() => handleLike(reply.id, true, comment.id)}
                            className="flex items-center gap-1 mt-1 text-xs text-base-content/70 hover:text-primary transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7v13m-3-4l-2-2m0 0l2-2m-2 2h12" />
                            </svg>
                            {reply.likes}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieComments;
