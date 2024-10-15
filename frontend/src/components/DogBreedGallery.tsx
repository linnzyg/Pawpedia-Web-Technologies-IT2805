import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/SortOrFilter.css';
import { useQuery } from '@apollo/client';
import { GET_BREEDS } from '../api/queries';
import { DogBreed } from '../types/DogBreed';

const DogBreedGallery: React.FC = () => {
  const { loading, error, data } = useQuery<{ breeds: DogBreed[] }>(GET_BREEDS);
  const [sortedDogs, setSortedDogs] = useState<DogBreed[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtering, setFiltering] = useState('');
  const [sorting, setSorting] = useState('');

  const filterRef = useRef<HTMLSelectElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (data && data.breeds) {
      let updatedDogs = [...data.breeds];

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
    }
  }, [filtering, sorting, searchQuery, data]);

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
    setSortedDogs(data == undefined ? [] : data.breeds);

    if (filterRef.current) filterRef.current.value = 'chooseFilter';
    if (sortRef.current) sortRef.current.value = 'chooseSorting';
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
        {sortedDogs.length > 0 ? (
          sortedDogs.map((breed) => (
            <div key={breed.id} className="breed-card">
              <Link to={`/${breed.id}`}>
                <h2>{breed.name}</h2>
              </Link>
            </div>
          ))
        ) : (
          <p>No breeds found.</p>
        )}
      </div>
    </>
  );
};

export default DogBreedGallery;
