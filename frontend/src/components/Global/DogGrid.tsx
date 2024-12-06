import { FC } from 'react';
import { DogBreed } from '../../types/DogBreed';
import BreedCard from '../Global/BreedCard';
import '../../style/DogGrid.css';

interface DogGridProps {
  allDogs: DogBreed[];
}

const DogGrid: FC<DogGridProps> = ({ allDogs }) => {
  return (
    <section className="grid-container">
      <section className="dog-breed-gallery">
        {allDogs.length > 0 ? allDogs.map((breed) => <BreedCard key={breed.id} breed={breed} />) : null}
      </section>
    </section>
  );
};

export default DogGrid;
