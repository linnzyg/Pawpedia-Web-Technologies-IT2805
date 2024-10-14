import { gql } from '@apollo/client';

// GraphQL query to get all breeds
export const GET_BREEDS = gql`
  query breedsquery {
    breeds {
      id
      name
      image {
        filename
        contentType
        gridFSId
      }
      size
    }
  }
`;

// GraphQL query to get specific breed
export const GET_BREED = gql`
  query breedquery($id: ID!) {
    breed(id: $id) {
      name
      description
      image {
        filename
        contentType
        gridFSId
      }
      comments {
        username
        comment
        timestamp
      }
      size
    }
  }
`;
