import { baseApi } from '@/api/baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query({
      query: () => '/category',
      providesTags: ['Category'],
    }),
    
    // Get single category by ID
    getCategoryById: builder.query({
      query: (id) => `/category/${id}`,
      providesTags: (result, error, id) => [{ type: 'Category', id }],
    }),
    
    // Create new category
    createCategory: builder.mutation({
      query: (data) => ({
        url: '/category',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    
    // Update category
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/category/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Category', id }, 'Category'],
    }),
    
    // Delete category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
