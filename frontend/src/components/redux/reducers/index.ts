import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import sortReducer from './sortReducer';
import searchReducer from './searchReducer';
import statsFilterReducer from './statsFilterReducer';

const rootReducer = combineReducers({
  filter: filterReducer,
  sort: sortReducer,
  search: searchReducer,
  statsFilter: statsFilterReducer
});

export default rootReducer;
