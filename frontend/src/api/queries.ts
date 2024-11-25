import { gql } from '@apollo/client';

/**
 * GraphQL query to get all breeds.
 * It supports pagination by accepting parameters like 'first' for the number of items,
 * optional 'filterBySize' to filter breeds based on size.
 * This query is used to display a list of all dog breeds.
 */
export const GET_BREEDS = gql`
  query GetBreeds($first: Int!, $filterBySize: [String], $searchByName: String, $orderBy: String, $skip: Int) {
    breeds(first: $first, filterBySize: $filterBySize, searchByName: $searchByName, orderBy: $orderBy, skip: $skip) {
      edges {
        cursor
        node {
          id
          name
          image
          size
          averageRating
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
      weight
      height
      lifespan
      trainability
      friendliness
      allergy
      energy
      issues
      comments {
        username
        comment
        timestamp
        rating
      }
      size
      averageRating
    }
  }
`;
