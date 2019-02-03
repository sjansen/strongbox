// @format
import {API_SET_TOKEN} from './types';

export function setApiToken(token) {
  return {
    type: API_SET_TOKEN,
    token: token,
  };
}
