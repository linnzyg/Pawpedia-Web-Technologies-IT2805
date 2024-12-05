import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Rating } from '@mui/material';
import { getUsername, setUsername } from '@/utils/userUtils';

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
  const [name, setName] = useState(getUsername() || '');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() && comment.trim() && rating > 0) {
      setUsername(name);
      onAddComment(name, comment, rating);
      setComment('');
      setRating(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <TextField
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 border-4 border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        multiline
        minRows={3}
        maxRows={8}
        placeholder="Your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
        inputProps={{ maxLength: 500 }}
      />
      <Box>
        <Rating
          aria-label="Rate 1-5"
          value={rating}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              setRating(newValue);
            }
          }}
          sx={{
            '& .MuiRating-icon': {
              fontSize: '40px', // Adjust the size here
            },
          }}
        ></Rating>
      </Box>
      <Button type="submit" className="submitComment">
        Submit Comment
      </Button>
    </form>
  );
};

export default Comment;
