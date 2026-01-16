import { baseApi } from '@/api/baseApi';

export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all clients
    getClients: builder.query({
      query: () => '/our-client',
      providesTags: ['Client'],
    }),
    
    // Get single client by ID
    getClientById: builder.query({
      query: (id) => `/our-client/${id}`,
      providesTags: (result, error, id) => [{ type: 'Client', id }],
    }),
    
    // Create new client
    createClient: builder.mutation({
      query: (data) => ({
        url: '/our-client',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Client'],
    }),
    
    // Update client
    updateClient: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/our-client/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Client', id }, 'Client'],
    }),
    
    // Delete client
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/our-client/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Client'],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;
