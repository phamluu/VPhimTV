import { timeAgo } from '~/utils/utils';

import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

interface Comment {
  id: number;
  full_name: string;
  avatar: string;
  updated_at: string;
  content: string;
  reply_count: number;
  replies?: Comment[];
}

interface CommentListProps {
  comments: Comment[];
  replies: Record<number, Comment[]>;
  onToggleReplies: (commentId: number) => void;
  expandedComments: Record<number, boolean>;
  onSubmitReply: (parentId: number, content: string) => void;
  replyingToCommentId?: number;
  setReplyingToCommentId: (id: number | undefined) => void;
}

export default function CommentList({
  comments,
  replies,
  onToggleReplies,
  expandedComments,
  onSubmitReply,
  replyingToCommentId,
  setReplyingToCommentId,
}: CommentListProps) {
  return (
    <div className="space-y-5">
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentItem
            userName={comment.full_name}
            avatar={`${import.meta.env.VITE_APP_API}${comment.avatar}`}
            date={timeAgo(comment.updated_at)}
            content={comment.content}
            onReplyClick={() => setReplyingToCommentId(replyingToCommentId === comment.id ? undefined : comment.id)}
          />

          {replyingToCommentId === comment.id && (
            <div className="ms-16 mt-2">
              <CommentInput
                onSubmit={(content) => {
                  onSubmitReply(comment.id, content);
                  setReplyingToCommentId(undefined);
                }}
                onCancel={() => setReplyingToCommentId(undefined)}
                avatar={`${import.meta.env.VITE_APP_API}${comment.avatar}`}
                hiddenButton={false}
                initialContent={`@${comment.full_name.replace(' ', '')} `}
              />
            </div>
          )}

          {comment.reply_count > 0 && (
            <div className="ms-16 space-y-5 mt-2">
              <button
                className="btn btn-ghost text-primary rounded-3xl hover:bg-primary/40 font-semibold"
                onClick={() => onToggleReplies(comment.id)}
              >
                <i className={`fa-solid ${expandedComments[comment.id] ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                {comment.reply_count} phản hồi
              </button>

              {expandedComments[comment.id] &&
                replies[comment.id]?.map((reply) => (
                  <div key={reply.id}>
                    <CommentItem
                      userName={reply.full_name}
                      avatar={`${import.meta.env.VITE_APP_API}${reply.avatar}`}
                      date={timeAgo(reply.updated_at)}
                      content={reply.content}
                      onReplyClick={() =>
                        setReplyingToCommentId(replyingToCommentId === reply.id ? undefined : reply.id)
                      }
                    />

                    {replyingToCommentId === reply.id && (
                      <div className="mt-2">
                        <CommentInput
                          onSubmit={(content) => {
                            onSubmitReply(comment.id, content);
                            setReplyingToCommentId(undefined);
                          }}
                          onCancel={() => setReplyingToCommentId(undefined)}
                          avatar={`${import.meta.env.VITE_APP_API}${reply.avatar}`}
                          hiddenButton={false}
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
