import React, { useState } from 'react';

/**
 * Props interface for the Comment component.
 * - `onAddComment`: Function to be called when a new comment is submitted.
 * - `breedId`: The ID of the breed to which the comment belongs.
 */

interface CommentProps {
  onAddComment: (username: string, comment: string, rating: number) => void;
  breedId: string;
}

/**
 * Comment Component
 * - Displays a form to collect a user's name and comment.
 * - Submits the comment through the `onAddComment` callback.
 * - Clears input fields after submission.
 */

const Comment: React.FC<CommentProps> = ({ onAddComment }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() && comment.trim() && rating > 0) {
      onAddComment(name, comment, rating);
      setName('');
      setComment('');
      setRating(0);
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

      {/* Star Rating */}
      <div className="star-rating flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>

      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Submit Comment
      </button>
    </form>
  );
};

export default Comment;
