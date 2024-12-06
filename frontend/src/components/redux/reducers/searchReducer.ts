import { SET_SEARCH, Action } from '../actions/types';

const initialState: string = '';

const searchReducer = (state = initialState, action: Action): string => {
  switch (action.type) {
    case SET_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
