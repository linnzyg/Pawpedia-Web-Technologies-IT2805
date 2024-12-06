import { SET_STATS_FILTER, Action } from '../actions/types';

const initialState: string[] | null = null;

const statsFilterReducer = (state = initialState, action: Action): string[] | null => {
  switch (action.type) {
    case SET_STATS_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default statsFilterReducer;
