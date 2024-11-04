import React from 'react';
import { useParams } from 'react-router-dom';
import DogBreedDetail from './DogBreedDetail';
import { useQuery } from '@apollo/client';
import { DogBreed } from '../types/DogBreed';
import { GET_BREED } from '../api/queries';

/**
 * DogBreedDetailWrapper Component
 * - Fetches data for a specific dog breed based on the breed ID from the URL.
 * - Displays loading, error, or the breed detail component as appropriate.
 */


const DogBreedDetailWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<{ breed: DogBreed }>(GET_BREED, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.breed) {
    return <div>Breed not found</div>;
  }

  return <DogBreedDetail breed={data.breed} id={id ?? ''} />;
};

export default DogBreedDetailWrapper;
