
<<<<<<< Updated upstream
const initialState = '';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchReducer = (state = initialState, action: any) => {
=======

import { SET_SEARCH, Action } from '../actions/types';

const initialState: string = '';

const searchReducer = (state = initialState, action: Action): string => {
>>>>>>> Stashed changes
  switch (action.type) {
    case SET_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
