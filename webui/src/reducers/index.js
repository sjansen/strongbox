import {combineReducers} from 'redux';
import quote from './quote';
import locked from './locked';

export default combineReducers({
  quote,
  locked,
});
