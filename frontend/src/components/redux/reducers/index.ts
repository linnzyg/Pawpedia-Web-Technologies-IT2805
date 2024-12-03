import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import sortReducer from './sortReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  filter: filterReducer,
  sort: sortReducer,
  search: searchReducer,
});

export default rootReducer;
