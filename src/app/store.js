import { configureStore } from '@reduxjs/toolkit';

import { dataApi } from './api';
import horsesReducer from '../features/horses/horsesSlice';

export const store = configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    horses: horsesReducer,
  },
  middleware: (getDefault) => getDefault().concat(dataApi.middleware),
});
