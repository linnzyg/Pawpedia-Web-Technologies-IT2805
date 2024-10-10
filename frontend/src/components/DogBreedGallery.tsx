import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockDogBreeds } from '../data/mockDogBreeds';
import '../style/SortOrFilter.css';

const DogBreedGallery: React.FC = () => {
  const [originalDogs] = useState(mockDogBreeds);
  const [sortedDogs, setSortedDogs] = useState(originalDogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtering, setFiltering] = useState('');
  const [sorting, setSorting] = useState('');

  const filterRef = useRef<HTMLSelectElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    let updatedDogs = [...originalDogs];

    if (filtering === 'bigDogs') {
      updatedDogs = updatedDogs.filter((dog) => dog.size === 'Large');
    } else if (filtering === 'smallDogs') {
      updatedDogs = updatedDogs.filter((dog) => dog.size === 'Small');
    }

    if (sorting === 'alpha') {
      updatedDogs.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sorting === 'favorites') {
      updatedDogs = updatedDogs.filter((dog) => dog.favorite);
    }

    if (searchQuery) {
      updatedDogs = updatedDogs.filter((dog) => dog.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setSortedDogs(updatedDogs);
  }, [filtering, sorting, searchQuery, originalDogs]);

  const optionClicked = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;

    if (newOption === 'bigDogs' || newOption === 'smallDogs') {
      setFiltering(newOption);
    } else if (newOption === 'alpha' || newOption === 'favorites') {
      setSorting(newOption);
    }
  };

  const resetFiltersAndSorting = () => {
    setSearchQuery('');
    setFiltering('');
    setSorting('');
    setSortedDogs(originalDogs);

    if (filterRef.current) filterRef.current.value = 'chooseFilter';
    if (sortRef.current) sortRef.current.value = 'chooseSorting';
  };

  return (
    <>
      <header id="sortOrFilter">
        <label htmlFor="sort">Sort by</label>
        <select ref={sortRef} name="sort" id="sort" onChange={optionClicked} defaultValue="chooseSorting">
          <option value="chooseSorting" disabled>
            Choose...
          </option>
          <option value="alpha">Alphabetically</option>
          <option value="favorites">Favorites</option>
        </select>
        <label htmlFor="filter">Filter by</label>
        <select ref={filterRef} name="filter" id="filter" onChange={optionClicked} defaultValue="chooseFilter">
          <option value="chooseFilter" disabled>
            Choose...
          </option>
          <option value="bigDogs">Big dogs</option>
          <option value="smallDogs">Small dogs</option>
        </select>
        <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
        <button id="reset-btn" onClick={resetFiltersAndSorting}>
          Reset
        </button>
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
