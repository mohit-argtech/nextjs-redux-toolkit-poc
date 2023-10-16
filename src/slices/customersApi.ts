// src/slices/customersApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { Customer, CustomerCollection, CustomerDto, NewCustomer } from '~/types/customers';
import { baseQuery } from '~/utils/baseQuery';

// Helper function to map DTO to domain
function mapDtoToDomain(customerDto: CustomerDto): Customer {
  const { name_id: nameId, ...rest } = customerDto;
  return { nameId, ...rest };
}

export const customersApi = createApi({
  reducerPath: 'customersApi',
  baseQuery,
  tagTypes: ['Customer'],
  endpoints: (builder) => ({
    createCustomer: builder.mutation<Customer, NewCustomer>({
      query: (newCustomer) => {
        const { nameId: name_id, ...rest } = newCustomer;
        return {
          url: '/customers',
          method: 'POST',
          body: { name_id, ...rest },
        };
      },
    }),
    getCustomers: builder.query<Customer[], void>({
      query: () => '/customers',
      transformResponse: (response: CustomerCollection) => response.items.map(mapDtoToDomain),
    }),
    getCustomerByNameId: builder.query<Customer | null, string>({
      query: (nameId) => `/customers/${nameId}`,
      transformResponse: (response: CustomerDto) => mapDtoToDomain(response),
    }),
  }),
  // extraOptions: {
  //   onError: (error: Error, { endpointName }) => {
  //     if (error instanceof FetchBaseQueryError) {
  //       if (error.status === 400 && endpointName === 'createCustomer' && error.data) {
  //         throw new InvalidInputException(error.data.message);
  //       }
  //     }
  //   },
  // },
});
