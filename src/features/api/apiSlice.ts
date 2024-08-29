import {Employee, Organization, OrganizationsResponse, UpdateEmployee} from '@/types';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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
      providesTags: (result, _, orgId) =>
        result
          ? [
              ...result.map(({id}) => ({type: 'Employees' as const, id})),
              {type: 'Employees', id: orgId},
            ]
          : [{type: 'Employees', id: orgId}],
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
    updateOrganization: builder.mutation<
      Organization,
      {
        id: string;
        name?: string;
        city?: string;
        phone?: string;
        email?: string;
        description?: string;
      }
    >({
      query: ({id, ...data}) => ({
        url: `organizations/${id}`,
        method: 'PUT',
        body: data,
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
        invalidatesTags: (_, __, {orgId}) => [{type: 'Employees', id: orgId}],
      },
    ),

    // Обновить сотрудника
    updateEmployee: builder.mutation<Employee, UpdateEmployee>({
      query: ({organizationId, employeeId, patch}) => ({
        url: `organizations/${organizationId}/employees/${employeeId}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_, __, {organizationId}) => [
        {type: 'Employees', id: organizationId},
      ],
    }),

    // Удалить сотрудника
    deleteEmployee: builder.mutation<void, {orgId: string; employeeId: string}>({
      query: ({orgId, employeeId}) => ({
        url: `organizations/${orgId}/employees/${employeeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, {orgId}) => [{type: 'Employees', id: orgId}],
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
