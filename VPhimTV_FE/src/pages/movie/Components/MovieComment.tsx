import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import Comment from '~/components/Comment';
import { useAuth } from '~/hooks/useAuth';
import { toast } from '~/hooks/utils/toast';
import { createComment } from '~/service/comment/commentApi';

export default function MovieComment() {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const mutationCreateComment = useMutation({
    mutationFn: (data: { movie_id: number; reply_to?: number; content: string }) => createComment(data),
    onSuccess: () => {
      setNewComment('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '40px';
      }
    },
    onError: (error) => {
      console.log('Error creating comment:', error);
      toast({ type: 'error', message: 'Không thể tạo bình luận, vui lòng thử lại sau.' });
    },
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    mutationCreateComment.mutate({ movie_id: 1, content: newComment });
  };

  const handleCancel = () => {
    setNewComment('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <div className="container mx-auto p-4 bg-base-300 rounded-lg">
      <form onSubmit={handleSubmitComment} className="mb-8">
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
            value={newComment}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (newComment.trim()) {
                  handleSubmitComment(e);
                }
              }
              if (e.key === 'Escape') {
                handleCancel();
              }
            }}
            name="comment"
            autoComplete="on"
            rows={1}
          />
        </div>

        {newComment.trim() && (
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-ghost hover:bg-gray-500 rounded-3xl"
              onClick={handleCancel}
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
        <Comment />
        <div className="ms-16 space-y-5">
          <button className="btn btn-ghost text-primary rounded-3xl hover:bg-primary/40 font-semibold">
            <i className="fa-solid fa-chevron-down"></i>3 phản hồi
          </button>
          <Comment />
        </div>
        <Comment />
        <Comment />
      </div>
    </div>
  );
}
