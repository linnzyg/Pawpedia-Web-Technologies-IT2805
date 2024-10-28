import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import Comment from './Comment';
import { ADD_COMMENT } from '../api/mutations';

describe('Comment Component', () => {
  const breedId = '6706af95370cf43e0a195b50';

  const mocks = [
    {
      request: {
        query: ADD_COMMENT,
        variables: {
          comment: {
            breedId,
            username: 'John Doe',
            comment: 'This is a test comment.',
          },
        },
      },
      result: {
        data: {
          addComment: {
            breedId,
            username: 'John Doe',
            comment: 'This is a test comment.',
            timestamp: '2023-01-01T00:00:00.000Z',
          },
        },
      },
    },
  ];

  it('renders input fields and button', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Comment breedId={breedId} onAddComment={vi.fn()} />
      </MockedProvider>
    );

    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your comment')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit comment/i })).toBeInTheDocument();
  });

  it('submits a comment and clears input fields', async () => {
    const mockAddComment = vi.fn();
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Comment breedId={breedId} onAddComment={mockAddComment} />
      </MockedProvider>
    );

    const nameInput = screen.getByPlaceholderText('Your name');
    const commentInput = screen.getByPlaceholderText('Your comment');
    const submitButton = screen.getByRole('button', { name: /submit comment/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(commentInput, { target: { value: 'This is a test comment.' } });

    fireEvent.click(submitButton);

    // Wait for the mutation to complete.
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockAddComment).toHaveBeenCalledWith('John Doe', 'This is a test comment.');

    expect(nameInput).toHaveValue('');
    expect(commentInput).toHaveValue('');
  });
});
