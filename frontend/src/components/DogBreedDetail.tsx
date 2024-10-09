import React from 'react';
import { DogBreed } from '../types/DogBreed';
import '../style/DogCard.css';
import favorite from '../assets/favorite.png';
import notFavorite from '../assets/notFavorite.png';
import '../style/DogBreedDetail.css'

interface DogBreedDetailProps {
  breed: DogBreed;
}

const DogBreedDetail: React.FC<DogBreedDetailProps> = ({ breed }) => {
  return (
    <div className="dog-breed-detail">
      <img className="dogImage" src={breed.imageUrl} alt={breed.name} />
      <section id="dogInfo">
        <h1>{breed.name}</h1>
        <p>{breed.description}</p>
        <button className="favorite-button">
          {breed.favorite ? ( 
            <img src={favorite} className="favorite-icon" alt="favorite icon" />
          ) : (
            <img src={notFavorite} className="favorite-icon" alt="not favorite icon" />
          )}
        </button>
      </section>
    </div>
  );
};

export default DogBreedDetail;
