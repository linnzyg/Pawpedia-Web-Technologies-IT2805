import {
  SET_FILTER,
  SET_SORT,
  SET_SEARCH,
  SET_STATS_FILTER,
  SetFilterAction,
  SetSortAction,
  SetSearchAction,
  SetStatsFilterAction,
} from './types';

// Action Creators
export const setFilter = (filters: string[] | null): SetFilterAction => ({
  type: SET_FILTER,
  payload: filters,
});

export const setSort = (orderBy: string): SetSortAction => ({
  type: SET_SORT,
  payload: orderBy,
});

export const setSearch = (searchTerm: string): SetSearchAction => ({
  type: SET_SEARCH,
  payload: searchTerm,
});

export const setStatsFilter = (filter: string[] | null): SetStatsFilterAction => ({
  type: SET_STATS_FILTER,
  payload: filter,
});
