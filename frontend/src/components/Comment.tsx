import React, { useState } from 'react';

interface CommentProps {
  onAddComment: (name: string, comment: string) => void;
}

const Comment: React.FC<CommentProps> = ({ onAddComment }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      onAddComment(name, comment);
      setName('');
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form p-4 bg-gray-50 rounded-md shadow-md space-y-4">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 border-4 border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Submit Comment
      </button>
    </form>
  );
};

export default Comment;
