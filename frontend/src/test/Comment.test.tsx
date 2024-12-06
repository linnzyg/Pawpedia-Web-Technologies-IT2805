import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import Comment from '../components/DogBreedDetail/Comment';
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
      </MockedProvider>,
    );

    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your comment')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit comment/i })).toBeInTheDocument();
  });
});
