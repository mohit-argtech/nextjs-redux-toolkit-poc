import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.NEXT_PUBLIC_BE_ADMIN_API_URL,
  baseUrl: 'https://bromptonenergy.io',
  // credentials: 'same-origin',
  mode: 'no-cors',
  prepareHeaders: (headers) => {
    // headers.set('BE_CSRFToken', document.cookie);
    // headers.set('Access-Control-Allow-Origin', '*');
    return headers;
  },
});
