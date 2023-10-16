import { createApi } from '@reduxjs/toolkit/query/react';
import { UserDetails } from '~/types/users';
import { baseQuery } from '~/utils/baseQuery';

export const usersApi = createApi({
  baseQuery,
  tagTypes: ['User', 'me'],
  endpoints: (builder) => ({
    // ...other endpoints
    getMe: builder.query<UserDetails, void>({
      query: () => '/v0/users/me',
    }),
  }),
  // TODO - this is not working
  // extraOptions: {
  //     // Global error handler
  //     onError: (error, { endpointName, originalArgs }) => {
  //         if (error.status === 401 && endpointName !== 'getMe') {
  //             api.util.invalidateTags(['User', 'me']);
  //         }
  //     },
  // },
});

export const { useGetMeQuery } = usersApi;
// ...other exports
