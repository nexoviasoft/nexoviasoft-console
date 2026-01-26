import { baseApi } from '@/api/baseApi';

export const columnsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all columns for a project
    getColumns: builder.query({
      query: (projectId) => `/columns?projectId=${projectId}`,
      providesTags: (result, error, projectId) => [{ type: 'Column', id: `project-${projectId}` }],
    }),
    
    // Get single column by ID
    getColumnById: builder.query({
      query: (id) => `/columns/${id}`,
      providesTags: (result, error, id) => [{ type: 'Column', id }],
    }),
    
    // Create new column
    createColumn: builder.mutation({
      query: (data) => ({
        url: '/columns',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: 'Column', id: `project-${projectId}` },
      ],
    }),
    
    // Update column
    updateColumn: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/columns/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id, projectId }) => [
        { type: 'Column', id },
        { type: 'Column', id: `project-${projectId}` },
      ],
    }),
    
    // Delete column
    deleteColumn: builder.mutation({
      query: ({ id, projectId }) => ({
        url: `/columns/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id, projectId }) => [
        { type: 'Column', id },
        { type: 'Column', id: `project-${projectId}` },
      ],
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useGetColumnByIdQuery,
  useCreateColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
} = columnsApi;
