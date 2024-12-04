import React, { useEffect, useRef, useState, useCallback } from 'react';
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
import { Box, Rating } from '@mui/material';

const DogBreedGallery: React.FC = () => {
  const dispatch = useDispatch();
  const filterBySize = useSelector((state: RootState) => state.filter);
  const orderBy = useSelector((state: RootState) => state.sort);
  const searchByName = useSelector((state: RootState) => state.search);

  const [allDogs, setAllDogs] = useState<DogBreed[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const sortRef = useRef<HTMLSelectElement>(null);

  // Search term to display for user when no breeds are found
  const [unvalidSearchTerm, setUnvalidSearchTerm] = useState<string>('');

  // Search term that intially gave no result 
  // Used to compare against new search term to avoid unnecessary refetching when new result are guaranteed to also be empty
  const [initialUnvalidSearchTerm, setInitialUnvalidSearchTerm] = useState<string>('');

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const { loading, error, fetchMore } = useQuery(GET_BREEDS, {
    skip: true, // Preventing automatic fetching on mount to avoid unnecessary requests
    fetchPolicy: 'network-only',
  });

  // Handle changes in filter
  const handleFilterChange = (filters: string[]) => {
    if (JSON.stringify(filters) !== JSON.stringify(filterBySize)) {
      // if there are currently no search term that gives no result, refetch with new filters should happen
      if(unvalidSearchTerm.length === 0) {
        fetchBreeds(8, filters.length > 0 ? filters : null, searchByName, orderBy);
      } else {
        // When current search term search gives no result, but the change in filters is that a filter is removed, refetch with less filters should happen, as it might give result with content
        if (JSON.stringify(filters).length < JSON.stringify(filterBySize).length) {
          fetchBreeds(8, filters.length > 0 ? filters : null, searchByName, orderBy);
        }
      }
      dispatch(setFilter(filters.length > 0 ? filters : null));
    }
  };

  // Handle changes in sorting
  const handleSortChange = (orderByValue: string) => {
    if (orderByValue !== '') {
      dispatch(setSort(orderByValue));
      // if there are currently no search term that gives no result, refetch with new sorting should happen. This is to avoid unnecessary refetching when new result are guaranteed to also be empty
      if(unvalidSearchTerm.length === 0) {
        fetchBreeds(8, filterBySize, searchByName, orderByValue);
      }
    }
  };

  const handleSearchChange = (search: string) => {
    if(unvalidSearchTerm.length > 0) {
      // refetch should only happen if the new search term do not includes the initial search term that gave no result 
      if(!search.includes(initialUnvalidSearchTerm)) {
        fetchBreeds(8, filterBySize, search, orderBy);
        setUnvalidSearchTerm('')
        setInitialUnvalidSearchTerm('')
      } else {
        setUnvalidSearchTerm(search);
      }
    } else {
      fetchBreeds(8, filterBySize, search, orderBy);
    }
    dispatch(setSearch(search)); // Update search term in Redux
  };

  const loadMoreItems = useCallback(() => {
    setTimeout(() => {
      handleLoadMore();
    }, 500); // Simulated delay for slower loading
  }, [allDogs, loading]);

  useEffect(() => {
    if (!lastItemRef.current) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    if (lastItemRef.current) observer.current.observe(lastItemRef.current);

    return () => observer.current?.disconnect();
  }, [allDogs, loadMoreItems]);

  // Handle loading more breeds when reaching the bottom
  const handleLoadMore = () => {
    if (!loading && hasNextPage) {
      fetchBreeds(8, filterBySize, searchByName, orderBy, allDogs.length);
    }
  };

  const fetchBreeds = (
    amount: number,
    filter: string[] | null,
    search: string | null,
    order: string | null,
    skip: number | null = null,
    isRefetch: boolean = false,
  ) => {
    try {
      fetchMore({
        variables: {
          first: amount,
          filterBySize: filter,
          searchByName: search,
          orderBy: order,
          skip: skip,
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
            setInitialUnvalidSearchTerm(search ?? '');
            fetchBreeds(8, null, '', null, null, true);
          } else if(!isRefetch) {
            setUnvalidSearchTerm('');
            setInitialUnvalidSearchTerm('');
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
        <section id="firstRow">
          <NameSorting onSortChange={handleSortChange} sortOption={orderBy} />
          <SizeFiltering onFilterChange={handleFilterChange} filterBySize={filterBySize} />
        </section>

        <section id="secondRow">
          <Search searchByName={searchByName} onSearchChange={handleSearchChange} />
          <button id="reset-btn" onClick={resetFiltersAndSorting}>
            Reset
          </button>
        </section>
      </section>
      {unvalidSearchTerm.length > 0 ? (
        <p style={{ textAlign: 'center' }}>
          No breeds found for search term:<strong> {unvalidSearchTerm}.</strong><br style={{ margin: '10px' }}></br>
          Here are all breeds instead:
        </p>
      ) : null}
      <section className="dog-breed-gallery">
        {allDogs.length > 0 ? (
          allDogs.map((breed) => (
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
          ))
        ) : (null)}
      </section>
      <div ref={lastItemRef} />
      {hasNextPage && (
        <button className="loadButton" onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </>
  );
};

export default DogBreedGallery;
