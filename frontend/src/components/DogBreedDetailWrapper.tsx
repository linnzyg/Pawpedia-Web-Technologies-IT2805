import React from 'react';
import { useParams } from 'react-router-dom';
import DogBreedDetail from './DogBreedDetail';
import { mockDogBreeds } from '../data/mockDogBreeds';

const DogBreedDetailWrapper: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const breed = mockDogBreeds.find((b) => b.slug === slug);

  if (!breed) {
    return <div>Breed not found</div>;
  }

  return <DogBreedDetail breed={breed} />;
};

export default DogBreedDetailWrapper;
