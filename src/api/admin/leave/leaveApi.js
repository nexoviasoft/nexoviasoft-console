import { baseApi } from '@/api/baseApi';

export const leaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all leave requests
    getLeaves: builder.query({
      query: () => '/leave',
      providesTags: ['Leave'],
    }),
    
    // Get leave statistics
    getLeaveStatistics: builder.query({
      query: (teamId) => {
        if (teamId) {
          return `/leave/statistics/${teamId}`;
        }
        return '/leave/statistics';
      },
      providesTags: ['Leave'],
    }),
    
    // Get single leave by ID
    getLeaveById: builder.query({
      query: (id) => `/leave/${id}`,
      providesTags: (result, error, id) => [{ type: 'Leave', id }],
    }),
    
    // Create new leave request
    createLeave: builder.mutation({
      query: (data) => ({
        url: '/leave',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Leave'],
    }),
    
    // Update leave request
    updateLeave: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/leave/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Leave', id }, 'Leave'],
    }),
    
    // Approve leave request
    approveLeave: builder.mutation({
      query: (id) => ({
        url: `/leave/${id}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Leave', id }, 'Leave'],
    }),
    
    // Reject leave request
    rejectLeave: builder.mutation({
      query: ({ id, rejectionReason }) => ({
        url: `/leave/${id}/reject`,
        method: 'PATCH',
        body: rejectionReason ? { rejectionReason } : {},
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Leave', id }, 'Leave'],
    }),
    
    // Delete leave request
    deleteLeave: builder.mutation({
      query: (id) => ({
        url: `/leave/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Leave'],
    }),
  }),
});

export const {
  useGetLeavesQuery,
  useGetLeaveByIdQuery,
  useGetLeaveStatisticsQuery,
  useCreateLeaveMutation,
  useUpdateLeaveMutation,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
  useDeleteLeaveMutation,
} = leaveApi;
