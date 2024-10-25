import { gql } from '@apollo/client';

// GraphQL query to get all breeds
export const GET_BREEDS = gql`
    query GetBreeds($first: Int!, $after: String, $filterBySize: String) {
        breeds(first: $first, after: $after, filterBySize: $filterBySize) {
            edges {
                cursor
                node {
                    id
                    name
                    image
                    size
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
            totalCount
        }
    }
`;

// GraphQL query to get specific breed
export const GET_BREED = gql`
  query breedquery($id: ID!) {
    breed(id: $id) {
      name
      description
      image
      comments {
        username
        comment
        timestamp
      }
      size
    }
  }
`;
