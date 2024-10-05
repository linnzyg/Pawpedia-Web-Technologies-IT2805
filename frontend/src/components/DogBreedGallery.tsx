import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockDogBreeds } from '../data/mockDogBreeds';
import '../style/SortOrFilter.css';

const DogBreedGallery: React.FC = () => {
  const [originalDogs] = useState(mockDogBreeds); // Original list of dogs
  const [sortedDogs, setSortedDogs] = useState(originalDogs); // List after filtering and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [filtering, setFiltering] = useState('');
  const [sorting, setSorting] = useState('');

  // Refs for the filter and sort dropdowns
  const filterRef = useRef<HTMLSelectElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);

  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Update sorted dogs based on filtering, sorting, and searching
  useEffect(() => {
    let updatedDogs = [...originalDogs];

    // Apply filtering
    if (filtering === 'bigDogs') {
      updatedDogs = updatedDogs.filter((dog) => dog.size === 'Large');
    } else if (filtering === 'smallDogs') {
      updatedDogs = updatedDogs.filter((dog) => dog.size === 'Small');
    }

    // Apply sorting
    if (sorting === 'alpha') {
      updatedDogs.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sorting === 'favorites') {
      updatedDogs = updatedDogs.filter((dog) => dog.favorite);
    }

    // Apply searching
    if (searchQuery) {
      updatedDogs = updatedDogs.filter((dog) => dog.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setSortedDogs(updatedDogs);
  }, [filtering, sorting, searchQuery, originalDogs]);

  // Handle option clicks for filtering and sorting
  const optionClicked = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;

    if (newOption === 'bigDogs' || newOption === 'smallDogs') {
      setFiltering(newOption);
    } else if (newOption === 'alpha' || newOption === 'favorites') {
      setSorting(newOption);
    }
  };

  // Reset all filters and sorting
  const resetFiltersAndSorting = () => {
    setSearchQuery('');
    setFiltering('');
    setSorting('');
    setSortedDogs(originalDogs); // Reset to the original list

    // Reset dropdowns to default
    if (filterRef.current) filterRef.current.value = 'chooseFilter';
    if (sortRef.current) sortRef.current.value = 'chooseSorting';
  };

  return (
    <>
      <header id="sortOrFilter">
        <p>Sort by</p>
        <select ref={sortRef} name="sort" id="sort" onChange={optionClicked} defaultValue="chooseSorting">
          <option value="chooseSorting" disabled>
            Choose...
          </option>
          <option value="alpha">Alphabetically</option>
          <option value="favorites">Favorites</option>
        </select>
        <p>Filter by</p>
        <select ref={filterRef} name="filter" id="filter" onChange={optionClicked} defaultValue="chooseFilter">
          <option value="chooseFilter" disabled>
            Choose...
          </option>
          <option value="bigDogs">Big dogs</option>
          <option value="smallDogs">Small dogs</option>
        </select>
        <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
        <button onClick={resetFiltersAndSorting}>Reset</button>
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
