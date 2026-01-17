import { baseApi } from '@/api/baseApi';

export const ourTeamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all team members
    getOurTeam: builder.query({
      query: () => '/our-team',
      providesTags: ['OurTeam'],
    }),
    
    // Get single team member by ID
    getOurTeamById: builder.query({
      query: (id) => `/our-team/${id}`,
      providesTags: (result, error, id) => [{ type: 'OurTeam', id }],
    }),
    
    // Create new team member
    createOurTeam: builder.mutation({
      query: (data) => ({
        url: '/our-team',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OurTeam'],
    }),
    
    // Update team member
    updateOurTeam: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/our-team/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'OurTeam', id }, 'OurTeam'],
    }),
    
    // Delete team member
    deleteOurTeam: builder.mutation({
      query: (id) => ({
        url: `/our-team/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OurTeam'],
    }),
    
    // Activate team member
    activateOurTeam: builder.mutation({
      query: (id) => ({
        url: `/our-team/${id}/activate`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'OurTeam', id }, 'OurTeam'],
    }),
    
    // Deactivate team member
    deactivateOurTeam: builder.mutation({
      query: (id) => ({
        url: `/our-team/${id}/deactivate`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'OurTeam', id }, 'OurTeam'],
    }),
    
    // Suspend team member
    suspendOurTeam: builder.mutation({
      query: (id) => ({
        url: `/our-team/${id}/suspend`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'OurTeam', id }, 'OurTeam'],
    }),
  }),
});

export const {
  useGetOurTeamQuery,
  useGetOurTeamByIdQuery,
  useCreateOurTeamMutation,
  useUpdateOurTeamMutation,
  useDeleteOurTeamMutation,
  useActivateOurTeamMutation,
  useDeactivateOurTeamMutation,
  useSuspendOurTeamMutation,
} = ourTeamApi;
