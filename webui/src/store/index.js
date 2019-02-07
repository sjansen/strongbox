// @format
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers';
import apiMiddleware from '../middleware/api';

const persistConfig = {
  key: 'root',
  stateReconciler: autoMergeLevel2,
  storage: storage,
  whitelist: ['auth'],
};

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  composeWithDevTools(applyMiddleware(apiMiddleware)),
);
export default store;

export const persistor = persistStore(store);
