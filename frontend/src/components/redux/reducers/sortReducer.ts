import { SET_SORT } from '../actions/types';

const initialState: string | null = null;

const sortReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SORT:
      return action.payload;
    default:
      return state;
  }
};

export default sortReducer;
