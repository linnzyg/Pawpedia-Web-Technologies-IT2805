import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/SortOrFilter.css';
import { useQuery } from '@apollo/client';
import { GET_BREEDS } from '../api/queries';
import { DogBreed } from '../types/DogBreed';
import Card from '@mui/material/Card';
import SizeFiltering from './SizeFiltering';
import NameSorting from './NameSorting';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSort, setSearch } from './redux/actions';
import { RootState } from './redux/store';
import { Rating } from '@mui/material';

const DogBreedGallery: React.FC = () => {
  const dispatch = useDispatch();
  const filterBySize = useSelector((state: RootState) => state.filter);
  const orderBy = useSelector((state: RootState) => state.sort);
  const searchByName = useSelector((state: RootState) => state.search);

  const [allDogs, setAllDogs] = useState<DogBreed[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const sortRef = useRef<HTMLSelectElement>(null);
  const [unvalidSearchTerm, setUnvalidSearchTerm] = useState<string>('');

  const { loading, error, fetchMore } = useQuery(GET_BREEDS, {
    variables: {
      first: 4,
      filterBySize: filterBySize || undefined,
      searchByName: searchByName || undefined,
      orderBy: orderBy || undefined,
      skip: 0
    },
    fetchPolicy: 'network-only',
  });

  // Handle changes in filter
  const handleFilterChange = (filters: string[]) => {
    if (JSON.stringify(filters) !== JSON.stringify(filterBySize)) {
      setUnvalidSearchTerm('');
      dispatch(setFilter(filters.length > 0 ? filters : null));
      fetchBreeds(8, filters.length > 0 ? filters : null, searchByName, orderBy);
    }
  };

  // Handle changes in sorting

  const handleSortChange = (orderByValue: string) => {
    if (orderByValue !== '') {
      dispatch(setSort(orderByValue));
      fetchBreeds(8, filterBySize, searchByName, orderByValue);
    }
  };

  const handleSearchChange = (search: string) => {
    if (search !== '') setUnvalidSearchTerm('');
    dispatch(setSearch(search)); // Update search term in Redux

    fetchBreeds(8, filterBySize, search, orderBy);
  };

  // Handle loading more breeds when reaching the bottom
  const handleLoadMore = () => {
    if (!loading && hasNextPage) {
      fetchBreeds(4, filterBySize, searchByName, orderBy, allDogs.length);
    }
  };

  const fetchBreeds = (
    amount: number,
    filter: string[] | null,
    search: string | null,
    order: string | null,
    skip: number | null = null,
  ) => {
    try {
      fetchMore({
        variables: {
          first: amount,
          filterBySize: filter,
          searchByName: search,
          orderBy: order,
          skip: skip
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return;

          const resultBreeds = fetchMoreResult.breeds.edges.map((edge: { node: DogBreed }) => ({
            ...edge.node,
          }));
          const newAllDogs = skip
            ? [
                ...allDogs,
                ...resultBreeds.filter(
                  (newBreed: { id: string }) => !allDogs.some((existingBreed) => existingBreed.id === newBreed.id),
                ),
              ]
            : resultBreeds;
          if (newAllDogs.length === 0) {
            setUnvalidSearchTerm(search ?? '');
            dispatch(setSearch('')); // Reset search term in Redux if no breeds found
            fetchBreeds(8, filterBySize, '', orderBy);
          }
          setAllDogs(newAllDogs);
          setHasNextPage(fetchMoreResult.breeds.pageInfo.hasNextPage);
        },
      });
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  // Reset filters and sorting
  const resetFiltersAndSorting = () => {
    dispatch(setSearch(''));
    dispatch(setFilter(null));
    dispatch(setSort(''));
    setAllDogs([]);
    fetchBreeds(8, null, null, null, null);
    setHasNextPage(true);
    setUnvalidSearchTerm('');

    if (sortRef.current) sortRef.current.value = '';
  };

  useEffect(() => {
    // Fetch breeds with the current Redux state
    fetchBreeds(8, filterBySize, searchByName, orderBy);
  }, []);

  if (loading && allDogs.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <section id="sortOrFilter">
        <NameSorting onSortChange={handleSortChange} sortOption={orderBy} />
        <SizeFiltering onFilterChange={handleFilterChange} filterBySize={filterBySize} />
        <Search searchByName={searchByName} onSearchChange={handleSearchChange} />
        <section id="secondRow">
          <button id="reset-btn" onClick={resetFiltersAndSorting}>
            Reset
          </button>
        </section>
      </section>
      {unvalidSearchTerm.length > 0 ? <p style={{ textAlign: 'center' }}>No breeds found for search term:<strong> {unvalidSearchTerm}.</strong></p> : null}
      <section className="dog-breed-gallery">
        {allDogs.length > 0 ? (
          allDogs.map((breed) => (
            <Card key={breed.id} className="breed-card">
              <Link to={`/${breed.id}`}>
                <h2>{breed.name}</h2>
                <p>
                  {breed?.averageRating ? (
                    <Rating readOnly value={Number(breed.averageRating.toFixed(1))} precision={0.1} />
                  ) : (
                    'No ratings yet'
                  )}
                </p>
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
