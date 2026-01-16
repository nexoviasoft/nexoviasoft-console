import { baseApi } from '@/api/baseApi';

export const pricePackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all price packages
    getPricePackages: builder.query({
      query: () => '/price-package',
      providesTags: ['PricePackage'],
    }),
    
    // Get single price package by ID
    getPricePackageById: builder.query({
      query: (id) => `/price-package/${id}`,
      providesTags: (result, error, id) => [{ type: 'PricePackage', id }],
    }),
    
    // Create new price package
    createPricePackage: builder.mutation({
      query: (data) => ({
        url: '/price-package',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PricePackage'],
    }),
    
    // Update price package
    updatePricePackage: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/price-package/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'PricePackage', id }, 'PricePackage'],
    }),
    
    // Delete price package
    deletePricePackage: builder.mutation({
      query: (id) => ({
        url: `/price-package/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PricePackage'],
    }),
  }),
});

export const {
  useGetPricePackagesQuery,
  useGetPricePackageByIdQuery,
  useCreatePricePackageMutation,
  useUpdatePricePackageMutation,
  useDeletePricePackageMutation,
} = pricePackageApi;
