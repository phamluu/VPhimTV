interface CommentItemProps {
  userName: string;
  avatar: string;
  date: string;
  content: string;
  onReplyClick?: () => void;
}

export default function Comment({ userName, avatar, date, content, onReplyClick }: CommentItemProps) {
  return (
    <div className="flex gap-4">
      <img loading="lazy" className="w-12 h-12 rounded-full select-none" src={avatar} alt={`Avatar ${userName}`} />
      <div className="flex-1">
        <div className="bg-base-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">{userName}</span>
            <span className="text-sm text-base-content/70">{date}</span>
          </div>
          <p className="mb-2 whitespace-pre-line">{content}</p>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-sm hover:bg-gray-500 rounded-2xl" onClick={onReplyClick}>
              Phản hồi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
