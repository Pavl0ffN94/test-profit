import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {OrganizationsResponse} from 'type';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  endpoints: builder => ({
    getOrganizations: builder.query<OrganizationsResponse, void>({
      query: () => 'mockData.json',
    }),
  }),
});

export const {useGetOrganizationsQuery} = apiSlice;
