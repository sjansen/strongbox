// @format
import {API_BEGIN, API_END, API_ERROR, ACCESS_DENIED} from '../actions/types';

export const apiBegin = label => ({
  type: API_BEGIN,
  payload: label,
});

export const apiEnd = label => ({
  type: API_END,
  payload: label,
});

export const accessDenied = url => ({
  type: ACCESS_DENIED,
  payload: {
    url,
  },
});

export const apiError = error => ({
  type: API_ERROR,
  error,
});
