import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import Comment from '~/components/Comment';
import { useAuth } from '~/hooks/useAuth';
import { toast } from '~/hooks/utils/toast';
import { createComment, fetchComments } from '~/service/comment/commentApi';
import { timeAgo } from '~/utils/utils';

interface MovieCommentProps {
  movieId: number;
}

export default function MovieComment({ movieId }: MovieCommentProps) {
  const { user } = useAuth();
  const [commentInput, setCommentInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({});
  const [replies, setReplies] = useState<Record<number, any[]>>({});

  const queryComments = useQuery({
    queryKey: ['comments', movieId],
    queryFn: () => fetchComments({ movie_id: movieId }),
  });

  const mutationFetchReplies = useMutation({
    mutationFn: (commentId: number) => fetchComments({ movie_id: movieId, reply_to: commentId }),
  });

  const mutationCreateComment = useMutation({
    mutationFn: (data: { movie_id: number; reply_to?: number; content: string }) => createComment(data),
    onSuccess: () => {
      setCommentInput('');
      queryComments.refetch();
      if (textareaRef.current) {
        textareaRef.current.style.height = '40px';
      }
    },
    onError: (error) => {
      console.log('Error creating comment:', error);
      toast({ type: 'error', message: 'Không thể tạo bình luận, vui lòng thử lại sau.' });
    },
  });

  const handleFormCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    mutationCreateComment.mutate({ movie_id: movieId, content: commentInput });
  };

  const handleFormCommentCancel = () => {
    setCommentInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
    }
  };

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleToggleReplies = async (commentId: any) => {
    const isExpanded = expandedComments[commentId];

    if (!isExpanded && !replies[commentId]) {
      const { data } = await mutationFetchReplies.mutateAsync(commentId);

      setReplies((prev) => ({
        ...prev,
        [commentId]: data,
      }));
    }

    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !isExpanded,
    }));
  };

  return (
    <div className="container mx-auto p-4 bg-base-300 rounded-lg">
      <form onSubmit={handleFormCommentSubmit} className="mb-8">
        <div className="flex gap-4 items-center">
          {user ? (
            <img
              loading="lazy"
              className="w-12 h-12 rounded-full flex items-center justify-center"
              src={`${import.meta.env.VITE_APP_API}${user.avatar}`}
            />
          ) : (
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-600 select-none">
              <span className="text-white text-xl font-bold">U</span>
            </div>
          )}

          <textarea
            ref={textareaRef}
            className="flex-1 bg-transparent border-0 border-b border-base-content/30 focus:border-primary focus:ring-0 text-base-content placeholder-base-content/60 outline-none py-2 resize-none min-h-[40px] max-h-40"
            placeholder="Viết bình luận..."
            value={commentInput}
            onChange={handleCommentInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (commentInput.trim()) {
                  handleFormCommentSubmit(e);
                }
              }
              if (e.key === 'Escape') {
                handleFormCommentCancel();
              }
            }}
            name="comment"
            autoComplete="on"
            rows={1}
          />
        </div>

        {commentInput.trim() && (
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-ghost hover:bg-gray-500 rounded-3xl"
              onClick={handleFormCommentCancel}
              tabIndex={-1}
            >
              HỦY
            </button>
            <button type="submit" className="btn btn-soft btn-primary rounded-3xl font-semibold">
              BÌNH LUẬN
            </button>
          </div>
        )}
      </form>

      {/* Danh sách bình luận */}
      <div className="space-y-5">
        {!queryComments.isLoading &&
          queryComments.data?.data.map((comment: any) => (
            <div key={comment.id}>
              <Comment
                key={comment.id}
                userName={comment.full_name}
                avatar={`${import.meta.env.VITE_APP_API}${comment.avatar}`}
                date={timeAgo(comment.updated_at)}
                content={comment.content}
              />

              {comment.reply_count > 0 && (
                <div className="ms-16 space-y-5">
                  <button
                    className="btn btn-ghost text-primary rounded-3xl hover:bg-primary/40 font-semibold"
                    onClick={() => handleToggleReplies(comment.id)}
                  >
                    <i className="fa-solid fa-chevron-down"></i>
                    {comment.reply_count} phản hồi
                  </button>

                  {expandedComments[comment.id] &&
                    replies[comment.id]?.map((reply: any) => (
                      <Comment
                        key={reply.id}
                        userName={reply.full_name}
                        avatar={`${import.meta.env.VITE_APP_API}${reply.avatar}`}
                        date={timeAgo(reply.updated_at)}
                        content={reply.content}
                      />
                    ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
