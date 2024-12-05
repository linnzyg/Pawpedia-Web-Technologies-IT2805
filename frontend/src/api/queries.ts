import { gql } from '@apollo/client';

/**
 * GraphQL query to get all breeds.
 * It supports pagination by accepting parameters like 'first' for the number of items,
 * optional 'filterBySize' to filter breeds based on size.
 * optional 'filterByStat' to filter breeds based on stats like allergy, weight and energy.
 * This query is used to display a list of all dog breeds.
 */
export const GET_BREEDS = gql`
  query GetBreeds(
    $first: Int!
    $filterBySize: [String]
    $filterByStat: [String]
    $searchByName: String
    $orderBy: String
    $skip: Int
  ) {
    breeds(
      first: $first
      filterBySize: $filterBySize
      filterByStat: $filterByStat
      searchByName: $searchByName
      orderBy: $orderBy
      skip: $skip
    ) {
      edges {
        id
        name
        image
        size
        averageRating
      }
      hasNextPage
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

export const GET_RANDOM_BREED = gql`
  query GetRandomBreed {
    randomBreed {
      id
    }
  }
`;
