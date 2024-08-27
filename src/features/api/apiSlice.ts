import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Employee, Organization, OrganizationsResponse} from 'types/orgResponce';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/'}),
  tagTypes: ['Organizations', 'Employees'],
  endpoints: builder => ({
    // Получить список организаций
    getOrganizations: builder.query<OrganizationsResponse, void>({
      query: () => 'organizations',
      providesTags: ['Organizations'],
    }),

    // Получить сотрудников по ID организации
    getEmployeesByOrganization: builder.query<Employee[], string>({
      query: orgId => `organizations/${orgId}/employees`,
      providesTags: (result, error, orgId) => [{type: 'Employees', id: orgId}],
    }),

    // Добавить новую организацию
    addOrganization: builder.mutation<Organization, Partial<Organization>>({
      query: newOrganization => ({
        url: 'organizations',
        method: 'POST',
        body: newOrganization,
      }),
      invalidatesTags: ['Organizations'],
    }),

    // Обновить организацию
    updateOrganization: builder.mutation<Organization, Partial<Organization>>({
      query: ({id, ...patch}) => ({
        url: `organizations/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Organizations'],
    }),

    // Удалить организацию
    deleteOrganization: builder.mutation<void, string>({
      query: id => ({
        url: `organizations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Organizations'],
    }),

    // Добавить сотрудника
    addEmployee: builder.mutation<Employee, {orgId: string; employee: Partial<Employee>}>(
      {
        query: ({orgId, employee}) => ({
          url: `organizations/${orgId}/employees`,
          method: 'POST',
          body: employee,
        }),
        invalidatesTags: (result, error, {orgId}) => [{type: 'Employees', id: orgId}],
      },
    ),

    // Обновить сотрудника
    updateEmployee: builder.mutation<Employee, Employee>({
      query: ({id, ...patch}) => ({
        url: `employees/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, {id}) => [{type: 'Employees', id}],
    }),

    // Удалить сотрудника
    deleteEmployee: builder.mutation<void, {orgId: string; employeeId: string}>({
      query: ({employeeId}) => ({
        url: `employees/${employeeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, {orgId}) => [{type: 'Employees', id: orgId}],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetEmployeesByOrganizationQuery,
  useAddOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = apiSlice;
