import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/SortOrFilter.css';
import { useQuery } from '@apollo/client';
import { GET_BREEDS } from '../api/queries';
import { DogBreed } from '../types/DogBreed';

const DogBreedGallery: React.FC = () => {
  const [allDogs, setAllDogs] = useState<DogBreed[]>([]);
  const [sortedDogs, setSortedDogs] = useState<DogBreed[]>([]);
  const [filterBySize, setFilterBySize] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filterRef = useRef<HTMLSelectElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);

  const { loading, error, fetchMore } = useQuery(GET_BREEDS, {
    variables: {
      first: 4,
      after: cursor,
      filterBySize: filterBySize || undefined,
    },
    fetchPolicy: 'network-only',
  });

  const applyFilter = (dogs: DogBreed[], filter: string | null) => {
    if (!filter) return dogs;
    return dogs.filter((dog) => dog.size === filter);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSizeFilter = event.target.value;
    setFilterBySize(newSizeFilter);
    const filteredDogs = applyFilter(allDogs, newSizeFilter);
    setSortedDogs(filteredDogs);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setSortedDogs(applyFilter(allDogs, filterBySize));
    } else {
      const searchedDogs = allDogs.filter((breed) => breed.name.toLowerCase().includes(query));
      setSortedDogs(applyFilter(searchedDogs, filterBySize));
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = event.target.value;
    setSortBy(sortType);
    const sortedList = [...sortedDogs];

    if (sortType === 'a-z') {
      sortedList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'z-a') {
      sortedList.sort((a, b) => a.name.localeCompare(b.name) * (-1));
    }
    setSortedDogs(sortedList);
  };

  const handleLoadMore = () => {
    if (!loading) {
      fetchMore({
        variables: {
          first: 4,
          after: cursor,
          filterBySize: filterBySize || undefined,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;

          const newBreeds = fetchMoreResult.breeds.edges.map((edge: { node: any; }) => edge.node);
          const uniqueBreeds = newBreeds.filter(
            (newBreed: { id: string; }) => !allDogs.some((existingBreed) => existingBreed.id === newBreed.id),
          );

          setAllDogs((prevDogs) => [...prevDogs, ...uniqueBreeds]);
          setSortedDogs((prevDogs) => [...applyFilter([...prevDogs, ...uniqueBreeds], filterBySize)]);
          setCursor(fetchMoreResult.breeds.pageInfo.endCursor);
          setSortBy('');
          return fetchMoreResult;
        },
      });
    }
  };

  //useffect that fetches eight first breeds when the page loades initially
  useEffect(() => {
    if (allDogs.length === 0) {
      fetchMore({
        variables: {
          first: 8,
          after: null,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;
  
          const initialBreeds = fetchMoreResult.breeds.edges.map((edge: { node: any; }) => edge.node);
          setAllDogs(initialBreeds);
          setSortedDogs(initialBreeds);
          setCursor(fetchMoreResult.breeds.pageInfo.endCursor);
          return fetchMoreResult;
        },
      });
    }
  }, []);

  const resetFiltersAndSorting = () => {
    setSearchQuery('');
    setFilterBySize(null);
    setSortBy(null);
    setSortedDogs([]);
    setAllDogs([]);
    setCursor(null);

    if (filterRef.current) filterRef.current.value = '';
    if (sortRef.current) sortRef.current.value = '';
  };

  if (loading && sortedDogs.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <section id="sortOrFilter">
        <section id="firstRow">
          <label htmlFor="sort">Sort by</label>
          <select ref={sortRef} name="sort" id="sort" value={sortBy || ''} onChange={handleSortChange}>
            <option value="" disabled>
              Choose...
            </option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
  
        </select>
          <label htmlFor="filter">Filter by Size:</label>
          <select ref={filterRef} name="filter" id="filter" onChange={handleFilterChange} value={filterBySize || ''}>
            <option value="" disabled>
              Choose...
            </option>
            <option value="Small">Small dogs</option>
          <option value="Medium">Medium dogs</option>
            <option value="Large">Large dogs</option>
          <option value="Giant">Giant dogs</option>
          </select>
        </section>

        <section id="secondRow">
          <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
          <button id="reset-btn" onClick={resetFiltersAndSorting}>
            Reset
          </button>
        </section>
      </section>

      <section className="dog-breed-gallery">
        {sortedDogs.length > 0 ? (
          sortedDogs.map((breed) => (
            <div key={breed.id} className="breed-card">
              <Link to={`/${breed.id}`}>
                <h2>{breed.name}</h2>
                <img src={`/images/${breed.image}`} alt={`Picture of ${breed.name}`} />
              </Link>
            </div>
          ))
        ) : (
          <p>No breeds found.</p>
        )}
      </div>
      <button onClick={handleLoadMore}>Load More</button>
    </>
  );
};

export default DogBreedGallery;
