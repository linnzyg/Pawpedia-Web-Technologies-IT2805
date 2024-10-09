import React, { useState } from 'react';
import { DogBreed } from '../types/DogBreed';
import Commentary from './Comment';

interface DogBreedDetailProps {
  breed: DogBreed;
}

interface Comment {
  name: string;
  text: string;
}

const DogBreedDetail: React.FC<DogBreedDetailProps> = ({ breed }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = (name: string, comment: string) => {
    setComments((prevComments) => [...prevComments, { name, text: comment }]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-4 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold">{breed.name}</h1>
      <div className="dog-breed-detail">
        <img src={breed.imageUrl} alt={breed.name} className="w-full h-64 object-cover rounded-md mb-4" />
        <p className="text-lg">{breed.description}</p>
      </div>

      
      <div className="commentary-section mt-6">
        <h2 className="text-2xl font-semibold mb-4">Leave a Comment</h2>
        <Commentary onAddComment={handleAddComment} />

        <h3 className="text-xl font-semibold mt-8">Comments</h3>
        {comments.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {comments.map((comment, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-md shadow">
                <strong className="block text-sm font-bold text-gray-700 mb-2">{comment.name}:</strong>
                <p className="text-gray-800">{comment.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default DogBreedDetail;
