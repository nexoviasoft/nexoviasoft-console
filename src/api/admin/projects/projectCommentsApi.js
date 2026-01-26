import { baseApi } from '@/api/baseApi';

export const projectCommentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all comments for a project
    getProjectComments: builder.query({
      query: (projectId) => `/project-comments?projectId=${projectId}`,
      providesTags: (result, error, projectId) => [{ type: 'ProjectComment', id: `project-${projectId}` }],
    }),
    
    // Get single comment by ID
    getProjectCommentById: builder.query({
      query: (id) => `/project-comments/${id}`,
      providesTags: (result, error, id) => [{ type: 'ProjectComment', id }],
    }),
    
    // Create new project comment
    createProjectComment: builder.mutation({
      query: (data) => ({
        url: '/project-comments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: 'ProjectComment', id: `project-${projectId}` },
        'Project',
      ],
    }),
    
    // Delete project comment
    deleteProjectComment: builder.mutation({
      query: ({ id, projectId }) => ({
        url: `/project-comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id, projectId }) => [
        { type: 'ProjectComment', id },
        { type: 'ProjectComment', id: `project-${projectId}` },
      ],
    }),
  }),
});

export const {
  useGetProjectCommentsQuery,
  useGetProjectCommentByIdQuery,
  useCreateProjectCommentMutation,
  useDeleteProjectCommentMutation,
} = projectCommentsApi;
