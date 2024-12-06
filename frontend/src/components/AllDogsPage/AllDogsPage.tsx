import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../../style/SortOrFilter.css';
import { useQuery } from '@apollo/client';
import { GET_BREEDS } from '../../api/queries';
import { DogBreed } from '../../types/DogBreed';
import SizeFiltering from './SortFilterOrSearch/SizeFiltering';
import SortingMenu from './SortFilterOrSearch/SortingMenu';
import Search from './SortFilterOrSearch/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSort, setSearch, setStatsFilter } from '../redux/actions';
import store, { RootState } from '../redux/store';
import { Button, Tooltip } from '@mui/material';
import StatsFilterMenu from './SortFilterOrSearch/StatsFilterMenu';
import DogGrid from '../Global/DogGrid';

const AllDogsPage: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const filterBySize = useSelector((state: RootState) => state.filter);
  const filterByStat = useSelector((state: RootState) => state.statsFilter);
  const orderBy = useSelector((state: RootState) => state.sort);
  const searchByName = useSelector((state: RootState) => state.search);

  const [allDogs, setAllDogs] = useState<DogBreed[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const sortRef = useRef<HTMLSelectElement>(null);
  const [isEmptyResult, setIsEmptyResult] = useState<boolean>(false);
  const [disableAutoFetch, setDisableAutoFetch] = useState<boolean>(false);

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
  useEffect(() => {
    if (disableAutoFetch) {
      const timer = setTimeout(() => {
        setDisableAutoFetch(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [disableAutoFetch]);

  // Handle changes in size filter
  const handleFilterChange = (filters: string[]) => {
    if (JSON.stringify(filters) !== JSON.stringify(filterBySize)) {
      // if there are currently no search term that gives no result, refetch with new filters should happen
      if (unvalidSearchTerm.length === 0) {
        fetchBreeds(8, filters.length > 0 ? filters : null, filterByStat, searchByName, orderBy);
      } else {
        // When current search term search gives no result, but the change in filters is that a filter is removed, refetch with less filters should happen, as it might give result with content
        if (JSON.stringify(filters).length < JSON.stringify(filterBySize).length) {
          fetchBreeds(8, filters.length > 0 ? filters : null, filterByStat, searchByName, orderBy);
        }
      }
      dispatch(setFilter(filters.length > 0 ? filters : null));
    }
  };

  // Handle changes in stats filter
  const handleStatsFilterChange = (filters: string[]) => {
    if (JSON.stringify(filters) !== JSON.stringify(filterByStat)) {
      // if there are currently no search term that gives no result, refetch with new filters should happen
      if (unvalidSearchTerm.length === 0) {
        fetchBreeds(8, filterBySize, filters.length > 0 ? filters : null, searchByName, orderBy);
      } else {
        // When current search term search gives no result, but the change in filters is that a filter is removed, refetch with less filters should happen, as it might give result with content
        if (JSON.stringify(filters).length < JSON.stringify(filterByStat).length) {
          fetchBreeds(8, filterBySize, filters.length > 0 ? filters : null, searchByName, orderBy);
        }
      }
      dispatch(setStatsFilter(filters.length > 0 ? filters : null));
    }
  };

  // Handle changes in sorting
  const handleSortChange = (orderByValue: string) => {
    if (orderByValue !== '') {
      dispatch(setSort(orderByValue));
      // if there are currently no search term that gives no result, refetch with new sorting should happen. This is to avoid unnecessary refetching when new result are guaranteed to also be empty
      if (unvalidSearchTerm.length === 0) {
        fetchBreeds(8, filterBySize, filterByStat, searchByName, orderByValue);
      }
    }
  };

  const handleSearchChange = (search: string) => {
    if (unvalidSearchTerm.length > 0) {
      // refetch should only happen if the new search term do not includes the initial search term that gave no result
      if (!search.includes(initialUnvalidSearchTerm)) {
        fetchBreeds(8, filterBySize, filterByStat, search, orderBy);
        setUnvalidSearchTerm('');
        setInitialUnvalidSearchTerm('');
        setDisableAutoFetch(true);
      } else {
        setUnvalidSearchTerm(search);
      }
    } else {
      fetchBreeds(8, filterBySize, filterByStat, search, orderBy);
    }
    dispatch(setSearch(search)); // Update search term in Redux
  };

  const loadMoreItems = useCallback(() => {
    setTimeout(() => {
      handleLoadMore();
    }, 300); // Simulated delay for slower loading
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      { threshold: 1.0 },
    );

    if (lastItemRef.current) observer.current.observe(lastItemRef.current);

    return () => observer.current?.disconnect();
  }, [allDogs, loadMoreItems]);

  // Handle loading more breeds when reaching the bottom
  const handleLoadMore = () => {
    if (!loading && hasNextPage) {
      fetchBreeds(8, filterBySize, filterByStat, searchByName, orderBy, allDogs.length);
    }
  };

  const fetchBreeds = (
    amount: number,
    filter: string[] | null,
    filterStat: string[] | null,
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
          filterByStat: filterStat,
          searchByName: search,
          orderBy: order,
          skip: skip,
        },
        updateQuery: (_previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return;

          const resultBreeds = fetchMoreResult.breeds.edges.map((breed: DogBreed) => ({
            ...breed,
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
            fetchBreeds(8, null, null, '', null, null, true);
            if (
              (!search || search.length === 0) &&
              filter &&
              filter.length > 0 &&
              filterStat &&
              filterStat.length > 0
            ) {
              setIsEmptyResult(true);
            }
          } else if (!isRefetch) {
            setUnvalidSearchTerm('');
            setInitialUnvalidSearchTerm('');
            setIsEmptyResult(false);
          }
          setAllDogs(newAllDogs);
          setHasNextPage(fetchMoreResult.breeds.hasNextPage);
        },
      });
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  // Reset filters and sorting
  const resetFiltersAndSorting = () => {
    dispatch(setSearch(''));
    dispatch(setFilter([]));
    dispatch(setSort(''));
    dispatch(setStatsFilter([]));
    setAllDogs([]);
    fetchBreeds(8, null, null, null, null, null);
    setHasNextPage(true);
    setUnvalidSearchTerm('');

    if (sortRef.current) sortRef.current.value = '';
  };

  useEffect(() => {
    // Fetch breeds with the current Redux state
    fetchBreeds(8, filterBySize, filterByStat, searchByName, orderBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && allDogs.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <section id="sortOrFilter">
        <section>
          <SortingMenu onSortChange={handleSortChange} sortOption={orderBy} />
          <StatsFilterMenu onStatsFilterChange={handleStatsFilterChange} filterByStat={filterByStat} />
          <SizeFiltering onFilterChange={handleFilterChange} filterBySize={filterBySize} />
        </section>
        <section>
          <Search searchByName={searchByName} onSearchChange={handleSearchChange} />
        </section>
        <section>
          <Tooltip title="Reset inputted settings">
            <Button id="reset-btn" onClick={resetFiltersAndSorting}>
              Reset
            </Button>
          </Tooltip>
        </section>
      </section>
      {unvalidSearchTerm.length > 0 ? (
        <p style={{ textAlign: 'center' }}>
          No breeds found for search term:<strong> {unvalidSearchTerm}.</strong>
          <br style={{ margin: '10px' }}></br>
          Here are all breeds instead:
        </p>
      ) : isEmptyResult && filterBySize && filterBySize.length > 0 && filterByStat && filterByStat.length > 0 ? (
        <p style={{ textAlign: 'center' }}>
          No breeds found with applied filters.<br style={{ margin: '10px' }}></br>
          Here are all breeds instead:
        </p>
      ) : null}
      <DogGrid allDogs={allDogs} />
      {!disableAutoFetch && <div ref={lastItemRef} />}
      {!hasNextPage && allDogs.length !== 0 && (
        <p style={{ textAlign: 'center', margin: '20px 0' }}>
          You have looked at {allDogs.length} of {allDogs.length} breeds.
        </p>
      )}
      {hasNextPage && <p style={{ textAlign: 'center', margin: '20px 0' }}></p>}
    </>
  );
};

export default AllDogsPage;
