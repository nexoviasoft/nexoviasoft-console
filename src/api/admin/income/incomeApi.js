import { baseApi } from '@/api/baseApi';

export const incomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIncomes: builder.query({
      query: () => '/income',
      providesTags: ['Income'],
    }),
    getIncome: builder.query({
      query: (id) => `/income/${id}`,
      providesTags: (result, error, id) => [{ type: 'Income', id }],
    }),
    createIncome: builder.mutation({
      query: (newIncome) => ({
        url: '/income',
        method: 'POST',
        body: newIncome,
      }),
      invalidatesTags: ['Income', 'Order', 'Dashboard'],
    }),
    updateIncome: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/income/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Income', id },
        'Income',
        'Order',
        'Dashboard',
      ],
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `/income/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Income', 'Order', 'Dashboard'],
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useGetIncomeQuery,
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = incomeApi;
