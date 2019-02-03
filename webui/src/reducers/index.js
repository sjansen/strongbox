// @format
import {combineReducers} from 'redux';
import auth from './auth';
import quote from './quote';
import locked from './locked';

export default combineReducers({
  auth,
  quote,
  locked,
});
