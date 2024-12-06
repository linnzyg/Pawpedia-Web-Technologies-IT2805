// types.ts

// Action Type Constants
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_STATS_FILTER = 'SET_STATS_FILTER';

// Action Interfaces
export interface SetFilterAction {
  type: typeof SET_FILTER;
  payload: string[] | null;
}

export interface SetSortAction {
  type: typeof SET_SORT;
  payload: string;
}

export interface SetSearchAction {
  type: typeof SET_SEARCH;
  payload: string;
}

export interface SetStatsFilterAction {
  type: typeof SET_STATS_FILTER;
  payload: string[] | null;
}


export type Action =
  | SetFilterAction
  | SetSortAction
  | SetSearchAction
  | SetStatsFilterAction;
