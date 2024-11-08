import React from 'react';
import { DogBreed } from '../types/DogBreed';
import '../style/DogCard.css';
import favorite from '../assets/favorite.png';
import notFavorite from '../assets/notFavorite.png';
import '../style/DogBreedDetail.css';
import Commentary from './Comment';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../api/mutations';
import { GET_BREED } from '../api/queries';

interface DogBreedDetailProps {
  breed: DogBreed;
  id: string;
}

const DogBreedDetail: React.FC<DogBreedDetailProps> = ({ breed, id }) => {
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_BREED, variables: { id: id } }],
    onError: (error) => {
      console.error('Error adding comment:', error);
    },
  });

  //La til rating der vi handler kommentarer
  const handleAddComment = (username: string, comment: string, rating: number) => {
    addComment({
      variables: {
        comment: {
          breedId: id,
          username,
          comment,
          rating,
        },
      },
    });
  };

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
      <div className="commentary-section mt-6">
        <header className="commentHeader">
          <h2 className="text-xl mt-8">Leave a Comment on {breed.name}:</h2>
          {}
          <Commentary onAddComment={handleAddComment} breedId={breed.id} />
        </header>
        <section className="commentSection">
          <h3 className="text-xl mt-8">Comments:</h3>
          {(breed.comments ?? []).length > 0 ? (
            <>
              {(breed.comments ?? []).map((comment: { username: string; comment: string; rating?: number }, index) => (
                <section key={index} className="commentElement">
                  <p className="commentName">
                    {comment.rating === null || comment.rating === undefined
                      ? `${comment.username}`
                      : `${comment.username} (${comment.rating} ★)`}
                    :
                  </p>
                  <p className="commentText">{comment.comment}</p>
                </section>
              ))}
            </>
          ) : (
            <p className="mt-4 text-gray-600">No comments yet. Be the first to comment!</p>
          )}
        </section>
      </div>
    </section>
  );
};

export default DogBreedDetail;
