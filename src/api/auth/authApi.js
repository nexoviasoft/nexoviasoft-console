import { baseApi } from '@/api/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Store token in localStorage
          if (data?.data?.access_token) {
            localStorage.setItem('auth_token', data.data.access_token);
          }
        } catch (error) {
          // Remove token on error
          localStorage.removeItem('auth_token');
        }
      },
    }),

    // Get current user
    getCurrentUser: builder.query({
      query: () => ({
        url: '/auth/me',
      }),
      providesTags: ['Auth'],
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          // Always remove token on logout
          localStorage.removeItem('auth_token');
        }
      },
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApi;
