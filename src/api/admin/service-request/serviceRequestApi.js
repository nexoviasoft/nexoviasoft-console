import { baseApi } from '@/api/baseApi';

export const serviceRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all service requests
    getServiceRequests: builder.query({
      query: () => '/service-request',
      providesTags: ['ServiceRequest'],
    }),
    
    // Get single service request by ID
    getServiceRequestById: builder.query({
      query: (id) => `/service-request/${id}`,
      providesTags: (result, error, id) => [{ type: 'ServiceRequest', id }],
    }),
    
    // Create new service request
    createServiceRequest: builder.mutation({
      query: (data) => ({
        url: '/service-request',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ServiceRequest'],
    }),
    
    // Update service request
    updateServiceRequest: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/service-request/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'ServiceRequest', id }, 'ServiceRequest'],
    }),
    
    // Delete service request
    deleteServiceRequest: builder.mutation({
      query: (id) => ({
        url: `/service-request/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ServiceRequest'],
    }),
  }),
});

export const {
  useGetServiceRequestsQuery,
  useGetServiceRequestByIdQuery,
  useCreateServiceRequestMutation,
  useUpdateServiceRequestMutation,
  useDeleteServiceRequestMutation,
} = serviceRequestApi;
