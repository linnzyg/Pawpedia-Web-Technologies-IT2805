
import React from 'react';
import { DogBreed } from '../types/DogBreed';

interface DogBreedDetailProps {
  breed: DogBreed;
}

const DogBreedDetail: React.FC<DogBreedDetailProps> = ({ breed }) => {
  return (
    <div className="dog-breed-detail">
      <h1>{breed.name}</h1>
      <img src={breed.imageUrl} alt={breed.name} />
      <p>{breed.description}</p>
    </div>
  );
};

export default DogBreedDetail;
