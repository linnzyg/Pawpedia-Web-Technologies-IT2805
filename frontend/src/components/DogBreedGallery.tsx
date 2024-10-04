
import React from 'react';
import { Link } from 'react-router-dom';
import { mockDogBreeds } from '../data/mockDogBreeds';
import '../style/SortOrFilter.css'

const DogBreedGallery: React.FC = () => {
  return (
    <>
      <header id='sortOrFilter'>
        <p>Sort by</p>
        <select name="sort" id="sort">
          <option value="alpha">Alphabetically</option>
          <option value="2">2</option>
        </select>
        <p>Filter by</p>
        <select name="filter" id="filter">
          <option value="bigDogs">Big dogs</option>
          <option value="smallDogs">Small dogs</option>
        </select>
      </header>
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
    </>
    
  );
};

export default DogBreedGallery;
