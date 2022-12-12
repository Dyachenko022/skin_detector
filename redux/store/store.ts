/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'

import user from '../reducers/userReducer';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  user
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export default store;
