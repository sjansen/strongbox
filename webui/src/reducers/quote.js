// @format
import {API_BEGIN, API_END, SET_QUOTE, TOGGLE_LOCK} from '../actions/types';

const quote = (state = {}, action) => {
  switch (action.type) {
    case API_BEGIN:
      if (action.payload === 'GET_QUOTE') {
        return {...state, loading: true};
      }
      return state;
    case API_END:
      if (action.payload === 'GET_QUOTE') {
        return {...state, loading: false};
      }
      return state;
    case SET_QUOTE:
      return {...state, loading: false, text: action.quote};
    case TOGGLE_LOCK:
      if (action.locked) {
        const {text, ...withoutQuote} = state;
        return withoutQuote;
      }
      return state;
    default:
      return state;
  }
};
export default quote;
