import { baseApi } from '@/api/baseApi';

export const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all expense requests
    getExpenses: builder.query({
      query: () => '/expense',
      providesTags: ['Expense'],
    }),
    
    // Get single expense by ID
    getExpenseById: builder.query({
      query: (id) => `/expense/${id}`,
      providesTags: (result, error, id) => [{ type: 'Expense', id }],
    }),
    
    // Create new expense request
    createExpense: builder.mutation({
      query: (data) => ({
        url: '/expense',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Expense', 'Dashboard'],
    }),
    
    // Update expense request (Manager/Admin)
    updateExpense: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/expense/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Expense', id }, 'Expense', 'Dashboard', 'Document'],
    }),
    
    // Delete expense request
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expense/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense'],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
