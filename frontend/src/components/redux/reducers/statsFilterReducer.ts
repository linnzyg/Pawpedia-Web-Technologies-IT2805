

import { SET_STATS_FILTER, Action } from '../actions/types';

const initialState: string[] | null = null;

<<<<<<< Updated upstream
const statsFilterReducer = (state = initialState, action: any) => {
=======
const statsFilterReducer = (state = initialState, action: Action): string[] | null => {
>>>>>>> Stashed changes
  switch (action.type) {
    case SET_STATS_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default statsFilterReducer;
