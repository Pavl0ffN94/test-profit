import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Employee, OrganizationsResponse} from 'types/orgResponce';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/'}),
  endpoints: builder => ({
    getOrganizations: builder.query<OrganizationsResponse, void>({
      query: () => 'organizations',
    }),

    updateEmployee: builder.mutation<void, Employee>({
      query: ({id, ...patch}) => ({
        url: `employees/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
  }),
});

export const {useGetOrganizationsQuery, useUpdateEmployeeMutation} = apiSlice;
