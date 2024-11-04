import { gql } from '@apollo/client';

/**
 * GraphQL mutation to add a new comment to a breed.
 * Accepts an input object containing breedId, username, comment, and timestamp.
 * This mutation is used to submit a comment on a specific dog breed.
 */

export const ADD_COMMENT = gql`
  mutation AddComment($comment: AddCommentInput!) {
    addComment(comment: $comment) {
      breedId
      username
      comment
      timestamp
    }
  }
`;
