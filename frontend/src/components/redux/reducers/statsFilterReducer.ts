import { SET_STATS_FILTER } from '../actions/types';

const initialState: string[] | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const statsFilterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_STATS_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default statsFilterReducer;
