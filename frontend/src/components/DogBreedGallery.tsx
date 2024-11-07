import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/SortOrFilter.css';
import { useQuery } from '@apollo/client';
import { GET_BREEDS } from '../api/queries';
import { DogBreed } from '../types/DogBreed';
import { Card } from './ui/card';

/**
 * DogBreedGallery Component
 * - Displays a gallery of dog breeds with functionalities to filter, sort, and search breeds.
 * - Allows users to load more breeds and reset filters/sorting.
 */

const DogBreedGallery: React.FC = () => {
  const [allDogs, setAllDogs] = useState<DogBreed[]>([]);
  const [sortedDogs, setSortedDogs] = useState<DogBreed[]>([]);
  const [filterBySize, setFilterBySize] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [searchByName, setSearchByName] = useState('');
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const filterRef = useRef<HTMLSelectElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);

  const { loading, error, fetchMore } = useQuery(GET_BREEDS, {
    variables: {
      first: 4,
      after: cursor,
      filterBySize: filterBySize || undefined,
      searchByName: searchByName || undefined
    },
    fetchPolicy: 'network-only',
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSizeFilter = event.target.value;
    setFilterBySize(newSizeFilter);
    if (newSizeFilter === 'All') {
      setFilterBySize(null);
      fetchBreeds(8, null, false, null);
    } else fetchBreeds(8, newSizeFilter, false, null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLowerCase();
    setSearchByName(search);

    if (search) {
      fetchBreeds(100, null, false, search);
   } else {
    fetchBreeds(8, null, false, null);
  }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = event.target.value;
    setSortBy(sortType);
    const sortedList = [...sortedDogs];

    if (sortType === 'a-z') {
      sortedList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'z-a') {
      sortedList.sort((a, b) => a.name.localeCompare(b.name) * -1);
    }
    setSortedDogs(sortedList);
  };

  const handleLoadMore = () => {
    if (!loading && hasNextPage) fetchBreeds(4, filterBySize, true, null);
  };

  //useffect that fetches eight first breeds when the page loades initially
  useEffect(() => {
    if (allDogs.length === 0) {
      fetchBreeds(8, null, false, null);
    }
  }, []);

  const fetchBreeds = (amount: number, filter: string | null, usePrevious: boolean, search: string | null) => {
    fetchMore({
      variables: {
        first: amount,
        after: usePrevious ? cursor : null,
        filterBySize: filter,
        searchByName: search
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        const resultBreeds = fetchMoreResult.breeds.edges.map((edge: { node: any }) => edge.node);

        //if previous result should be included, add the previous fetched breeds to the new result
        const newAllDogs = usePrevious
          ? [
              ...allDogs,
              ...resultBreeds.filter(
                (newBreed: { id: string }) => !allDogs.some((existingBreed) => existingBreed.id === newBreed.id),
              ),
            ]
          : resultBreeds;
        setAllDogs(newAllDogs);
        setSortedDogs(newAllDogs);
        setCursor(fetchMoreResult.breeds.pageInfo.endCursor);
        setHasNextPage(fetchMoreResult.breeds.pageInfo.hasNextPage);
        return fetchMoreResult;
      },
    });
  };

  const resetFiltersAndSorting = () => {
    setSearchByName('');
    setFilterBySize(null);
    setSortBy(null);
    setSortedDogs([]);
    setAllDogs([]);
    setCursor(null);
    fetchBreeds(8, null, false, null);
    setHasNextPage(true);

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
            <option value="All">All</option>
            <option value="Small">Small dogs</option>
            <option value="Medium">Medium dogs</option>
            <option value="Large">Large dogs</option>
            <option value="Giant">Giant dogs</option>
          </select>
        </section>

        <section id="secondRow">
          <input type="text" placeholder="Search..." value={searchByName || ''} onChange={handleSearchChange} />
          <button id="reset-btn" onClick={resetFiltersAndSorting}>
            Reset
          </button>
        </section>
      </section>

      <section className="dog-breed-gallery">
        {sortedDogs.length > 0 ? (
          sortedDogs.map((breed) => (
            <Card key={breed.id} className="breed-card">
              <Link to={`/${breed.id}`}>
                <h2>{breed.name}</h2>
                <img src={`/images/${breed.image}`} alt={`Picture of ${breed.name}`} />
              </Link>
            </Card>
          ))
        ) : (
          <p>No breeds found.</p>
        )}
      </section>
      {hasNextPage && (
        <button className="loadButton" onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </>
  );
};

export default DogBreedGallery;
