import { baseApi } from '@/api/baseApi';

export const taskCommentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all comments for a task
    getTaskComments: builder.query({
      query: (taskId) => `/task-comments?taskId=${taskId}`,
      providesTags: (result, error, taskId) => [{ type: 'TaskComment', id: `task-${taskId}` }],
    }),
    
    // Get single comment by ID
    getTaskCommentById: builder.query({
      query: (id) => `/task-comments/${id}`,
      providesTags: (result, error, id) => [{ type: 'TaskComment', id }],
    }),
    
    // Create new task comment
    createTaskComment: builder.mutation({
      query: (data) => ({
        url: '/task-comments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'TaskComment', id: `task-${taskId}` },
        { type: 'Task', id: taskId },
      ],
    }),
    
    // Delete task comment
    deleteTaskComment: builder.mutation({
      query: ({ id, taskId }) => ({
        url: `/task-comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id, taskId }) => [
        { type: 'TaskComment', id },
        { type: 'TaskComment', id: `task-${taskId}` },
        { type: 'Task', id: taskId },
      ],
    }),
  }),
});

export const {
  useGetTaskCommentsQuery,
  useGetTaskCommentByIdQuery,
  useCreateTaskCommentMutation,
  useDeleteTaskCommentMutation,
} = taskCommentsApi;
