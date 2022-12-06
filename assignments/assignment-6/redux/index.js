import { combineReducers, createStore } from 'redux';

import photos from './photos/reducer';

const reducers = combineReducers({
  photos
});

const store = createStore(reducers);
export default store;
