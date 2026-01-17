import { baseApi } from '@/api/baseApi';

export const ourProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products
    getOurProducts: builder.query({
      query: () => '/our-product',
      providesTags: ['OurProduct'],
    }),
    
    // Get single product by ID
    getOurProductById: builder.query({
      query: (id) => `/our-product/${id}`,
      providesTags: (result, error, id) => [{ type: 'OurProduct', id }],
    }),
    
    // Create new product
    createOurProduct: builder.mutation({
      query: (data) => ({
        url: '/our-product',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OurProduct'],
    }),
    
    // Update product
    updateOurProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/our-product/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'OurProduct', id }, 'OurProduct'],
    }),
    
    // Delete product
    deleteOurProduct: builder.mutation({
      query: (id) => ({
        url: `/our-product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OurProduct'],
    }),
  }),
});

export const {
  useGetOurProductsQuery,
  useGetOurProductByIdQuery,
  useCreateOurProductMutation,
  useUpdateOurProductMutation,
  useDeleteOurProductMutation,
} = ourProductApi;
