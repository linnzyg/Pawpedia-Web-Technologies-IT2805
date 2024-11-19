
import { SET_FILTER, SET_SORT, SET_SEARCH } from './types';

export const setFilter = (filters: string[] | null) => ({
  type: SET_FILTER,
  payload: filters,
});

export const setSort = (orderBy: string | null) => ({
  type: SET_SORT,
  payload: orderBy,
});

export const setSearch = (searchTerm: string) => ({
  type: SET_SEARCH,
  payload: searchTerm,
});
