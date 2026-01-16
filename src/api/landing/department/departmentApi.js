import { baseApi } from '@/api/baseApi';

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all departments
    getDepartments: builder.query({
      query: () => '/department',
      providesTags: ['Department'],
    }),
    
    // Get single department by ID
    getDepartmentById: builder.query({
      query: (id) => `/department/${id}`,
      providesTags: (result, error, id) => [{ type: 'Department', id }],
    }),
    
    // Create new department
    createDepartment: builder.mutation({
      query: (data) => ({
        url: '/department',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Department'],
    }),
    
    // Update department
    updateDepartment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/department/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Department', id }, 'Department'],
    }),
    
    // Delete department
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/department/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Department'],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
