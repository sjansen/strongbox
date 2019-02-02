// @format
import {API, GET_QUOTE, SET_QUOTE, TOGGLE_LOCK} from './types';

export function getQuote() {
  return apiAction({
    url: '/api/quote/',
    onSuccess: setQuote,
    onFailure: () => {
      console.log('Error loading quote');
    },
    label: GET_QUOTE,
  });
}

function setQuote(data) {
  return {
    type: SET_QUOTE,
    quote: data.quote,
  };
}

export function toggleLock(locked) {
  return {type: TOGGLE_LOCK, locked};
}

function apiAction({
  url = '',
  method = 'GET',
  data = null,
  accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = '',
  headersOverride = null,
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride,
    },
  };
}
