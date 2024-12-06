

import { SET_SORT, Action } from '../actions/types';

const initialState: string | null = null;

<<<<<<< Updated upstream
const sortReducer = (state = initialState, action: any) => {
=======
const sortReducer = (state = initialState, action: Action): string | null => {
>>>>>>> Stashed changes
  switch (action.type) {
    case SET_SORT:
      return action.payload;
    default:
      return state;
  }
};

export default sortReducer;
