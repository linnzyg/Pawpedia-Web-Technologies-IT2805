import { SET_FILTER } from '../actions/types';

const initialState: string[] | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
