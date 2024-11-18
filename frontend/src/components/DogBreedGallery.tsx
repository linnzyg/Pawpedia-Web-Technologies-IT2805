import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/SortOrFilter.css';
import { useQuery } from '@apollo/client';
import { GET_BREEDS } from '../api/queries';
import { DogBreed } from '../types/DogBreed';
import { Card } from './ui/card';
import SizeFiltering from './SizeFiltering';
import NameSorting from './NameSorting';
import Search from './Search';

const DogBreedGallery: React.FC = () => {
  const [allDogs, setAllDogs] = useState<DogBreed[]>([]);
  const [sortedDogs, setSortedDogs] = useState<DogBreed[]>([]);
  const [filterBySize, setFilterBySize] = useState<string[] | null>(null);
  const [orderBy, setOrderBy] = useState('');
  const [cursor, setCursor] = useState<string | null>(null);
  const [searchByName, setSearchByName] = useState('');
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const sortRef = useRef<HTMLSelectElement>(null);

  const { loading, error, fetchMore } = useQuery(GET_BREEDS, {
    variables: {
      first: 4,
      after: cursor,
      filterBySize: filterBySize || undefined,
      searchByName: searchByName || undefined,
      orderBy: orderBy || undefined,
    },
    fetchPolicy: 'network-only',
  });

  // Handle changes in filter
  const handleFilterChange = (filters: string[]) => {
    setFilterBySize(filters.length > 0 ? filters : null);
    fetchBreeds(8, filters.length > 0 ? filters : null, false, searchByName, orderBy);
  };

  // Handle changes in sorting
  const handleSortChange = (orderBy: string) => {
    setOrderBy(orderBy);
    fetchBreeds(8, filterBySize, false, searchByName, orderBy);
  };
  
  // Handle changes in search input
  const handleSearchChange = (search: string) => {
    setSearchByName(search); // Update search term
    fetchBreeds(8, filterBySize, false, search, orderBy); // Fetch with updated search term
  };

  // Handle loading more breeds when reaching the bottom
  const handleLoadMore = () => {
    if (!loading && hasNextPage) fetchBreeds(4, filterBySize, true, searchByName, orderBy);
  };

  // Fetch breeds based on current filters, search, and sorting
  const fetchBreeds = (amount: number, filter: string[] | null, usePrevious: boolean, search: string | null, order: string | null) => {
    try {
      fetchMore({
        variables: {
          first: amount,
          after: usePrevious ? cursor : null,
          filterBySize: filter,
          searchByName: search,
          orderBy: order
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;

          const resultBreeds = fetchMoreResult.breeds.edges.map((edge: { node: DogBreed }) => edge.node);

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
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  // Reset filters and sorting
  const resetFiltersAndSorting = () => {
    setSearchByName('');
    setFilterBySize(null);
    setOrderBy('');
    setSortedDogs([]);
    setAllDogs([]);
    setCursor(null);
    fetchBreeds(8, null, false, null, null);
    setHasNextPage(true);

    if (sortRef.current) sortRef.current.value = '';
  };

  useEffect(() => {
    if (allDogs.length === 0) {
      fetchBreeds(8, null, false, null, null); // Initial fetch without filters or search
    }
  }, []);

  if (loading && sortedDogs.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <section id="sortOrFilter">
        <NameSorting onSortChange={handleSortChange} />
        <SizeFiltering onFilterChange={handleFilterChange} />
        <Search searchByName={searchByName} onSearchChange={handleSearchChange} />
        
        <section id="secondRow">
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
