import { configureStore } from '@reduxjs/toolkit';

import { dataApi } from './api';
import horsesReducer from '../features/horses/horsesSlice';

export const store = configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    horses: horsesReducer,
  },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['horses/setSocket'],
        ignoredPaths: ['horses.socket'],
      },
    }).concat(dataApi.middleware),
});
