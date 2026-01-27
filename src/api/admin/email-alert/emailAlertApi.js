import { baseApi } from '@/api/baseApi';

export const emailAlertApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all email alerts
    getEmailAlerts: builder.query({
      query: () => '/email-alert',
      providesTags: ['EmailAlert'],
    }),
    
    // Get single email alert by ID
    getEmailAlertById: builder.query({
      query: (id) => `/email-alert/${id}`,
      providesTags: (result, error, id) => [{ type: 'EmailAlert', id }],
    }),
    
    // Create new email alert
    createEmailAlert: builder.mutation({
      query: (data) => ({
        url: '/email-alert',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['EmailAlert'],
    }),
    
    // Update email alert
    updateEmailAlert: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/email-alert/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'EmailAlert', id }, 'EmailAlert'],
    }),
    
    // Delete email alert
    deleteEmailAlert: builder.mutation({
      query: (id) => ({
        url: `/email-alert/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EmailAlert'],
    }),

    // Send email
    sendEmail: builder.mutation({
      query: ({ to, subject, body }) => ({
        url: '/email-alert/send',
        method: 'POST',
        body: { to, subject, body },
      }),
    }),
  }),
});

export const {
  useGetEmailAlertsQuery,
  useGetEmailAlertByIdQuery,
  useCreateEmailAlertMutation,
  useUpdateEmailAlertMutation,
  useDeleteEmailAlertMutation,
  useSendEmailMutation,
} = emailAlertApi;
