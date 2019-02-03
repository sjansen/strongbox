// @format
import {GET_QUOTE, SET_QUOTE} from './types';

import {apiAction} from './api';

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
