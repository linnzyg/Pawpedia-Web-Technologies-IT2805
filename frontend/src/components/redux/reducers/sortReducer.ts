

import { SET_SORT, Action } from '../actions/types';

const initialState: string | null = null;

const sortReducer = (state = initialState, action: Action): string | null => {
  switch (action.type) {
    case SET_SORT:
      return action.payload;
    default:
      return state;
  }
};

export default sortReducer;