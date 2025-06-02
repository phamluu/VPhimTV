import { ChevronDown, MoreVertical,ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: '@FujiiKaze',
      userInitials: 'F',
      content: "I'm not okay with the fact that this masterpiece is so underrated.",
      time: '5 năm trước',
      likes: 19,
      dislikes: 0,
      replies: 128,
      isLiked: false,
      isDisliked: false,
      repliesExpanded: false,
      repliesList: [
        {
          id: 11,
          user: '@musiclover123',
          userInitials: 'M',
          content: 'Totally agree! This deserves millions of views',
          time: '4 năm trước',
          likes: 5,
          isLiked: false
        },
        {
          id: 12,
          user: '@vietnamesemusic',
          userInitials: 'V',
          content: 'Fujii Kaze is truly talented, hope more people discover his music',
          time: '3 năm trước',
          likes: 8,
          isLiked: false
        }
      ]
    },
    {
      id: 2,
      user: '@lucey',
      userInitials: 'L',
      content: '"It\'s about a feeling I\'ve never had" lmaooo charlie really just said "u aint that special relax" to all his exes',
      time: '5 năm trước',
      likes: 12,
      dislikes: 0,
      replies: 45,
      isLiked: false,
      isDisliked: false,
      repliesExpanded: false,
      repliesList: []
    },
    {
      id: 3,
      user: '@justafawn',
      userInitials: 'S',
      content: '"This song is not about a person, it\'s about a feeling I\'ve never had"\nlol can relate right here, I can\'t cheat on anyone if I\'ve always been single-',
      time: '5 năm trước',
      likes: 2100,
      dislikes: 0,
      replies: 21,
      isLiked: false,
      isDisliked: false,
      repliesExpanded: false,
      repliesList: []
    },
    {
      id: 4,
      user: '@ahmedabas5370',
      userInitials: 'A',
      content: 'A beautiful feeling, his voice is beautiful and nostalgic',
      time: '1 năm trước',
      likes: 0,
      dislikes: 0,
      replies: 0,
      isLiked: false,
      isDisliked: false,
      repliesExpanded: false,
      repliesList: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + ' N';
    }
    return num.toString();
  };

  const handleLike = (commentId: number, isReply = false, parentId: number | null = null) => {
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
                      isLiked: !reply.isLiked
                    }
                  : reply
              )
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
              isDisliked: false
            }
          : comment
      ));
    }
  };

  const handleDislike = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? {
            ...comment,
            isDisliked: !comment.isDisliked,
            isLiked: false,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes
          }
        : comment
    ));
  };

  const toggleReplies = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, repliesExpanded: !comment.repliesExpanded }
        : comment
    ));
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: '@yourhandle',
        userInitials: 'Y',
        content: newComment,
        time: 'Vừa xong',
        likes: 0,
        dislikes: 0,
        replies: 0,
        isLiked: false,
        isDisliked: false,
        repliesExpanded: false,
        repliesList: []
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleSubmitReply = (commentId) => {
    if (replyText.trim()) {
      const reply = {
        id: Date.now(),
        user: '@yourhandle',
        userInitials: 'Y',
        content: replyText,
        time: 'Vừa xong',
        likes: 0,
        isLiked: false
      };
      setComments(comments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies + 1,
              repliesList: [...comment.repliesList, reply]
            }
          : comment
      ));
      setReplyText('');
      setReplyTo(null);
    }
  };

  return (
    <div className=" text-white min-h-screen">
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
