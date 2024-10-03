
import React from 'react';
import { Link } from 'react-router-dom';
import { mockDogBreeds } from '../data/mockDogBreeds';

const DogBreedGallery: React.FC = () => {
  return (
    <div className="dog-breed-gallery">
      {mockDogBreeds.map((breed) => (
        <div key={breed.id} className="breed-card">
          <h2>{breed.name}</h2>
          <Link to={`/${breed.slug}`}>
            <img src={breed.imageUrl} alt={breed.name} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DogBreedGallery;
