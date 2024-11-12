import { gql } from '@apollo/client';

/**
 * GraphQL query to get all breeds.
 * It supports pagination by accepting parameters like 'first' for the number of items,
 * 'after' for the cursor, and optional 'filterBySize' to filter breeds based on size.
 * This query is used to display a list of all dog breeds.
 */
export const GET_BREEDS = gql`
  query GetBreeds($first: Int!, $after: String, $filterBySize: String, $searchByName: String) {
    breeds(first: $first, after: $after, filterBySize: $filterBySize, searchByName: $searchByName) {
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

/**
 * GraphQL query to get a specific breed by ID.
 * This query is used to fetch the details of a specific dog breed, including its name,
 * description, image, size, and any comments associated with it.
 */
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
        rating
      }
      size
    }
  }
`;
