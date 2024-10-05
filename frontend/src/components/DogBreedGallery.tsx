import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockDogBreeds } from '../data/mockDogBreeds';
import '../style/SortOrFilter.css';

const DogBreedGallery: React.FC = () => {
  const [sortedDogs, setSortedDogs] = useState(mockDogBreeds);
  const [sorting, setSorting] = useState('');
  const [filtering, setFiltering] = useState('');

  const sortAlphabetically = () => {
    let newSortedDogs = [...mockDogBreeds].sort((a, b) => a.name.localeCompare(b.name));
    if (filtering === 'bigDogs') newSortedDogs = newSortedDogs.filter((dog) => dog.size === 'Large');
    if (filtering === 'smallDogs') newSortedDogs = newSortedDogs.filter((dog) => dog.size === 'Small');
    setSortedDogs(newSortedDogs);
  };

  const filterFavorites = () => {
    let favoriteDogs = mockDogBreeds.filter((dog) => dog.favorite);
    if (filtering === 'bigDogs') favoriteDogs = favoriteDogs.filter((dog) => dog.size === 'Large');
    if (filtering === 'smallDogs') favoriteDogs = favoriteDogs.filter((dog) => dog.size === 'Small');
    setSortedDogs(favoriteDogs);
  };

  const filterBigDogs = () => {
    let bigDogs = mockDogBreeds.filter((dog) => dog.size === 'Large');
    if (sorting === 'alpha') bigDogs = [...bigDogs].sort((a, b) => a.name.localeCompare(b.name));
    if (sorting === 'favorites') bigDogs = bigDogs.filter((dog) => dog.favorite);
    setSortedDogs(bigDogs);
  };

  const filterSmallDogs = () => {
    let smallDogs = mockDogBreeds.filter((dog) => dog.size === 'Small');
    if (sorting === 'alpha') smallDogs = [...smallDogs].sort((a, b) => a.name.localeCompare(b.name));
    if (sorting === 'favorites') smallDogs = smallDogs.filter((dog) => dog.favorite);
    setSortedDogs(smallDogs);
  };

  const optionClicked = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;

    switch (newOption) {
      case 'bigDogs':
        setFiltering('bigDogs');
        filterBigDogs();
        break;
      case 'smallDogs':
        setFiltering('smallDogs');
        filterSmallDogs();
        break;
      case 'alpha':
        setSorting('alpha');
        sortAlphabetically();
        break;
      case 'favorites':
        setSorting('favorites');
        filterFavorites();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <header id="sortOrFilter">
        <p>Sort by</p>
        <select name="sort" id="sort" onChange={optionClicked} defaultValue="chooseSorting">
          <option value="chooseSorting" disabled>
            Choose...
          </option>
          <option value="alpha">Alphabetically</option>
          <option value="favorites">Favorites</option>
        </select>
        <p>Filter by</p>
        <select name="filter" id="filter" onChange={optionClicked} defaultValue="chooseFilter">
          <option value="chooseFilter" disabled>
            Choose...
          </option>
          <option value="bigDogs">Big dogs</option>
          <option value="smallDogs">Small dogs</option>
        </select>
      </header>
      <div className="dog-breed-gallery">
        {sortedDogs.map((breed) => (
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
