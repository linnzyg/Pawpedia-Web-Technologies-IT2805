import React from 'react';
import { Card, Box, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

// Define the Breed interface to type the breed prop
interface Breed {
  id: string;
  name: string;
  averageRating?: number;
  image: string;
}

// Define the BreedCardProps interface to type the props for the BreedCard component
interface BreedCardProps {
  breed: Breed;
}

// BreedCard component definition
const BreedCard: React.FC<BreedCardProps> = ({ breed }) => {
  return (
    <Card key={breed.id} className="breed-card">
      <Link to={`/${breed.id}`}>
        <Box className="dogCardHeader">
          <h2>{breed.name}</h2>
          <p>
            {breed?.averageRating ? (
              <Rating readOnly value={Number(breed.averageRating.toFixed(1))} precision={0.1} />
            ) : (
              'No ratings yet'
            )}
          </p>
        </Box>
        <img src={`/images/${breed.image}`} alt={`Picture of ${breed.name}`} />
      </Link>
    </Card>
  );
};

export default BreedCard;
