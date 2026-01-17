import { baseApi } from '@/api/baseApi';

export const footerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get single footer (no ID needed - single resource)
    getFooter: builder.query({
      query: () => '/footer',
      providesTags: ['Footer'],
    }),
    
    // Update footer (no ID needed - single resource)
    updateFooter: builder.mutation({
      query: (data) => ({
        url: '/footer',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Footer'],
    }),
  }),
});

export const {
  useGetFooterQuery,
  useUpdateFooterMutation,
} = footerApi;
