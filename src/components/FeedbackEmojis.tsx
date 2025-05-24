import React from 'react';

interface FeedbackEmojisProps {
  onFeedback: (feedback: string) => void;
}

const FeedbackEmojis: React.FC<FeedbackEmojisProps> = ({ onFeedback }) => {
  const feedbackOptions = ['👍', '❤️', '😮', '😂', '👎'];

  return (
    <div className="flex space-x-2">
      {feedbackOptions.map((emoji) => (
        <button
          key={emoji}
          className="text-2xl hover:scale-110 transition-transform"
          onClick={() => onFeedback(emoji)}
          aria-label={`Give ${emoji} feedback`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default FeedbackEmojis;