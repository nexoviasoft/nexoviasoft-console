import { baseApi } from '@/api/baseApi';

export const ourServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all services
    getOurServices: builder.query({
      query: () => '/our-service',
      providesTags: ['OurService'],
    }),
    
    // Get single service by ID
    getOurServiceById: builder.query({
      query: (id) => `/our-service/${id}`,
      providesTags: (result, error, id) => [{ type: 'OurService', id }],
    }),
    
    // Create new service
    createOurService: builder.mutation({
      query: (data) => ({
        url: '/our-service',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OurService'],
    }),
    
    // Update service
    updateOurService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/our-service/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'OurService', id }, 'OurService'],
    }),
    
    // Delete service
    deleteOurService: builder.mutation({
      query: (id) => ({
        url: `/our-service/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OurService'],
    }),
  }),
});

export const {
  useGetOurServicesQuery,
  useGetOurServiceByIdQuery,
  useCreateOurServiceMutation,
  useUpdateOurServiceMutation,
  useDeleteOurServiceMutation,
} = ourServiceApi;
