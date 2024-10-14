import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Comment from './Comment';

describe('Comment Component', () => {
  it('renders input fields and button', () => {
    render(<Comment onAddComment={vi.fn()} />);

    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your comment')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit comment/i })).toBeInTheDocument();
  });

  it('submits a comment and clears input fields', () => {
    const mockAddComment = vi.fn();
    render(<Comment onAddComment={mockAddComment} />);

    const nameInput = screen.getByPlaceholderText('Your name');
    const commentInput = screen.getByPlaceholderText('Your comment');
    const submitButton = screen.getByRole('button', { name: /submit comment/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(commentInput, { target: { value: 'This is a test comment.' } });

    fireEvent.click(submitButton);

    expect(mockAddComment).toHaveBeenCalledWith('John Doe', 'This is a test comment.');

    expect(nameInput).toHaveValue('');
    expect(commentInput).toHaveValue('');
  });
});
