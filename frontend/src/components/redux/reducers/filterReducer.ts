
import { SET_FILTER } from '../actions/types';

const initialState: string[] | null = null;

const filterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
