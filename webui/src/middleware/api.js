// @format
import axios from 'axios';
import {API} from '../actions/types';
import {accessDenied, apiBegin, apiEnd, apiError} from '../actions/api';

const apiMiddleware = ({dispatch, getState}) => next => action => {
  next(action);

  if (action.type !== API) return;

  const {
    url,
    method,
    data,
    accessToken,
    onSuccess,
    onFailure,
    label,
    headers,
  } = action.payload;
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  const state = getState();
  const token = accessToken
    ? accessToken
    : state && state.auth
    ? state.auth.token
    : null;
  const combinedHeaders = token
    ? {
        Authorization: `Bearer ${token}`,
        ...headers,
      }
    : headers;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  if (label) {
    dispatch(apiBegin(label));
  }

  axios
    .request({
      url,
      method,
      headers: combinedHeaders,
      [dataOrParams]: data,
    })
    .then(({data}) => {
      dispatch(onSuccess(data));
    })
    .catch(error => {
      dispatch(apiError(error));
      dispatch(onFailure(error));

      if (error.response && error.response.status === 403) {
        dispatch(accessDenied(window.location.pathname));
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;
