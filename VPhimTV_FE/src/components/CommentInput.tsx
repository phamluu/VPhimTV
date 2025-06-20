import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';

interface CommentInputProps {
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
  avatar?: string;
  className?: string;
  hiddenButton?: boolean;
  initialContent?: string;
}

export default function CommentInput({
  onSubmit,
  onCancel,
  autoFocus,
  avatar,
  className,
  hiddenButton = true,
  initialContent,
}: CommentInputProps) {
  const [content, setContent] = useState(initialContent || '');
  const [isFocused, setIsFocused] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus, initialContent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  const handleCancel = () => {
    setContent('');
    onCancel?.();
    setIsFocused(false);
  };

  return (
    <form onSubmit={handleFormSubmit} className={`${className}`}>
      <div className="flex gap-4 items-start">
        {avatar ? (
          <img className="w-10 h-10 rounded-full" src={avatar} alt="avatar" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
            U
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (content.trim()) handleFormSubmit(e);
            }
            if (e.key === 'Escape') handleCancel();
          }}
          placeholder="Viết bình luận..."
          className="flex-1 border-b border-base-content/30 focus:border-primary bg-transparent outline-none resize-none py-2"
          rows={1}
        />
      </div>

      {(isFocused || content.trim() || !hiddenButton) && (
        <div className="flex justify-between mt-2 relative">
          <button
            className="text-2xl ms-16 hover:bg-gray-500 w-10 h-10 rounded-full cursor-pointer"
            type="button"
            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
          >
            <i className="fa-regular fa-face-smile"></i>
          </button>

          <div className="absolute top-10 left-15 z-10" tabIndex={0} onBlur={() => setIsEmojiPickerOpen(false)}>
            <EmojiPicker
              theme={Theme.DARK}
              searchDisabled={true}
              lazyLoadEmojis={true}
              open={isEmojiPickerOpen}
              onEmojiClick={(emoji) => {
                setContent((prev) => prev + emoji.emoji);
              }}
            />
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={handleCancel} className="btn btn-ghost hover:bg-gray-500 rounded-3xl">
              HỦY
            </button>
            <button type="submit" className="btn btn-soft btn-primary rounded-3xl font-semibold">
              BÌNH LUẬN
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
