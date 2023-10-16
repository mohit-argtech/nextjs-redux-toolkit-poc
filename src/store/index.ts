// File: src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { customersApi } from '~/slices/customersApi';
import { usersApi } from '~/slices/usersApi';
import { timeseriesApi } from '~/slices/timeseriesApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [timeseriesApi.reducerPath]: timeseriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // usersApi.middleware,
      // customersApi.middleware,
      timeseriesApi.middleware,
    ),
  devTools: true,
});
