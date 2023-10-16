// src/slices/timeseriesApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { TimeSeriesData, TimeSeriesDataParams } from '~/types/timeseries';
import { baseQuery } from '~/utils/baseQuery';

export const timeseriesApi = createApi({
  reducerPath: 'timeseriesApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getMeasurementSeries: builder.query<TimeSeriesData, TimeSeriesDataParams>({
      query: ({ customerId, start, measId }) => {
        debugger;
        return {
          url: `/api/v0_1/timeseries/history/${customerId}?start=${start}&meas_id=${measId}`,
          responseHandler: async (response) => {
            debugger;
            return response.json();
          },
        };
      },
      // Pick out data and prevent nested properties in a hook or selector
      transformErrorResponse(baseQueryReturnValue, meta, arg): string {
        debugger;
        return '';
      },
      transformResponse: (response: { data: TimeSeriesData }) => {
        debugger;
        return response.data;
      },
    }),
  }),
});

export const { useGetMeasurementSeriesQuery } = timeseriesApi;
