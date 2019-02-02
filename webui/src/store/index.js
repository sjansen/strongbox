// @format
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from '../reducers';
import apiMiddleware from '../middleware/api';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(apiMiddleware)),
);
export default store;
