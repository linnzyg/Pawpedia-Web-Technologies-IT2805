import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation AddComment($comment: AddCommentInput!) {
    addComment(comment: $comment) {
      breedId
      username
      comment
      rating
      timestamp
    }
  }
`;
