import { SET_SEARCH } from '../actions/types';

const initialState = '';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
