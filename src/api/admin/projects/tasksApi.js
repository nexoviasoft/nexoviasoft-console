import { baseApi } from '@/api/baseApi';

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all tasks for a project
    getTasks: builder.query({
      query: (projectId) => `/tasks?projectId=${projectId}`,
      providesTags: (result, error, projectId) => [{ type: 'Task', id: `project-${projectId}` }],
    }),
    
    // Get single task by ID
    getTaskById: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: 'Task', id }],
    }),
    
    // Create new task
    createTask: builder.mutation({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: 'Task', id: `project-${projectId}` },
        'Project',
      ],
    }),
    
    // Update task
    updateTask: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id, projectId }) => [
        { type: 'Task', id },
        { type: 'Task', id: `project-${projectId}` },
        'Project',
      ],
    }),
    
    // Move task (drag and drop)
    moveTask: builder.mutation({
      query: (data) => ({
        url: '/tasks/move',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, data) => {
        const tags = [];
        if (data?.taskId) {
          tags.push({ type: 'Task', id: data.taskId });
        }
        if (data?.projectId) {
          tags.push({ type: 'Task', id: `project-${data.projectId}` });
          tags.push({ type: 'Project', id: data.projectId });
        }
        return tags;
      },
    }),
    
    // Delete task
    deleteTask: builder.mutation({
      query: ({ id, projectId }) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id, projectId }) => [
        { type: 'Task', id },
        { type: 'Task', id: `project-${projectId}` },
        'Project',
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useMoveTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
