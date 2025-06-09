import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import CommentInput from '~/components/CommentInput';
import CommentList from '~/components/CommentList';
import { useAuth } from '~/hooks/useAuth';
import { toast } from '~/hooks/utils/toast';
import { createComment, fetchComments } from '~/service/comment/commentApi';

interface MovieCommentProps {
  movieId: number;
  sortBy?: 'desc' | 'asc';
}

export default function MovieComment({ movieId, sortBy }: MovieCommentProps) {
  const { user } = useAuth();
  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({});
  const [commentReplies, setCommentReplies] = useState<Record<number, any[]>>({});
  const [replyingToCommentId, setReplyingToCommentId] = useState<number | undefined>(undefined);

  const queryComments = useQuery({
    queryKey: ['comments', movieId, sortBy],
    queryFn: () => fetchComments({ movie_id: movieId, sort_type: sortBy }),
  });

  const repliesMutation = useMutation({
    mutationFn: (commentId: number) => fetchComments({ movie_id: movieId, reply_to: commentId }),
  });

  const createCommentMutation = useMutation({
    mutationFn: (data: { movie_id: number; reply_to?: number; content: string }) => createComment(data),
    onSuccess: () => {
      queryComments.refetch();
    },
    onError: () => toast({ type: 'error', message: 'Không thể tạo bình luận, vui lòng thử lại sau.' }),
  });

  const handleToggleReplies = async (commentId: number) => {
    const isExpanded = expandedComments[commentId];
    if (!isExpanded && !commentReplies[commentId]) {
      const { data } = await repliesMutation.mutateAsync(commentId);
      setCommentReplies((prev) => ({ ...prev, [commentId]: data }));
    }
    setExpandedComments((prev) => ({ ...prev, [commentId]: !isExpanded }));
  };

  return (
    <div className="container mx-auto p-4 bg-base-300 rounded-lg">
      <CommentInput
        className="mb-8"
        onSubmit={(content) => createCommentMutation.mutate({ movie_id: movieId, content })}
        avatar={user ? `${import.meta.env.VITE_APP_API}${user.avatar}` : undefined}
      />

      <CommentList
        comments={queryComments.data?.data || []}
        replies={commentReplies}
        expandedComments={expandedComments}
        onToggleReplies={handleToggleReplies}
        onSubmitReply={async (parentId, content) => {
          await createCommentMutation.mutateAsync({ movie_id: movieId, reply_to: parentId, content });
        }}
        replyingToCommentId={replyingToCommentId}
        setReplyingToCommentId={setReplyingToCommentId}
      />
    </div>
  );
}
