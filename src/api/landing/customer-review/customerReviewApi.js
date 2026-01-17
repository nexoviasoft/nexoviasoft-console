import { baseApi } from '@/api/baseApi';

export const customerReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all customer reviews
    getCustomerReviews: builder.query({
      query: () => '/customer-review',
      providesTags: ['CustomerReview'],
    }),
    
    // Get single customer review by ID
    getCustomerReviewById: builder.query({
      query: (id) => `/customer-review/${id}`,
      providesTags: (result, error, id) => [{ type: 'CustomerReview', id }],
    }),
    
    // Create new customer review
    createCustomerReview: builder.mutation({
      query: (data) => ({
        url: '/customer-review',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CustomerReview'],
    }),
    
    // Update customer review
    updateCustomerReview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/customer-review/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'CustomerReview', id }, 'CustomerReview'],
    }),
    
    // Delete customer review
    deleteCustomerReview: builder.mutation({
      query: (id) => ({
        url: `/customer-review/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CustomerReview'],
    }),
  }),
});

export const {
  useGetCustomerReviewsQuery,
  useGetCustomerReviewByIdQuery,
  useCreateCustomerReviewMutation,
  useUpdateCustomerReviewMutation,
  useDeleteCustomerReviewMutation,
} = customerReviewApi;
