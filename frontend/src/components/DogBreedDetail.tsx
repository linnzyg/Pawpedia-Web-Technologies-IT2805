import React from 'react';
import { DogBreed } from '../types/DogBreed';
import '../style/DogCard.css';
import favorite from '../assets/favorite.png';
import notFavorite from '../assets/notFavorite.png';
import '../style/DogBreedDetail.css';
import Commentary from './Comment';

interface DogBreedDetailProps {
  breed: DogBreed;
}

const DogBreedDetail: React.FC<DogBreedDetailProps> = ({ breed }) => {
  const handleAddComment = () => {};
  // comment objektet har et timestamp også, hvis man ønsker å vise dette
  // hvis dette ikke ønskes slett kommentaren min -eirin
  // for testing purpose: only mittelspitz have comment for now

  return (
    <section>
      <div className="dog-breed-detail">
        <img src={`/images/${breed.image}`} alt={`Picture of our dog breed: ${breed.name}`} />
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
      <section className="commentHeader">
        <h2 className="text-xl mt-8">Leave a Comment on {breed.name}:</h2>
        <Commentary onAddComment={handleAddComment} />
      </section>

      <section className="commentSection">
        <h3 className="text-xl mt-8">Comments:</h3>
        {(breed.comments ?? []).length > 0 ? (
          <>
            {(breed.comments ?? []).map((comment: { username: string; comment: string }, index) => (
              <section key={index} className="commentElement">
                <p className="commentName">{comment.username} : </p>
                <p className="commentText">{comment.comment}</p>
              </section>
            ))}
          </>
        ) : (
          <p className="mt-4 text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </section>
    </section>
  );
};

export default DogBreedDetail;
