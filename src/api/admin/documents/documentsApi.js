import { baseApi } from '@/api/baseApi';

export const documentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all documents
    getDocuments: builder.query({
      query: () => '/documents',
      providesTags: ['Document'],
    }),
    
    // Get single document by ID
    getDocumentById: builder.query({
      query: (id) => `/documents/${id}`,
      providesTags: (result, error, id) => [{ type: 'Document', id }],
    }),
    
    // Create new document
    createDocument: builder.mutation({
      query: (data) => ({
        url: '/documents',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Document'],
    }),
    
    // Update document
    updateDocument: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/documents/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Document', id }, 'Document'],
    }),
    
    // Delete document
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Document'],
    }),

    // Send document by email
    sendDocumentByEmail: builder.mutation({
      query: ({ id, recipientEmail, subject, message }) => ({
        url: `/documents/${id}/send-email`,
        method: 'POST',
        body: { recipientEmail, subject, message },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Document', id }, 'Document'],
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentByIdQuery,
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
  useSendDocumentByEmailMutation,
} = documentsApi;
