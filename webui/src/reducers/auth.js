// @format
import {API_SET_TOKEN} from '../actions/types';

const auth = (state = {}, action) => {
  switch (action.type) {
    case API_SET_TOKEN:
      return {token: action.token};
    default:
      return state;
  }
};
export default auth;
