import { baseApi } from '@/api/baseApi';

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchedules: builder.query({
      query: () => '/schedule',
      providesTags: ['Schedule'],
    }),

    getScheduleById: builder.query({
      query: (id) => `/schedule/${id}`,
      providesTags: (result, error, id) => [{ type: 'Schedule', id }],
    }),

    createSchedule: builder.mutation({
      query: (data) => ({
        url: '/schedule',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Schedule'],
    }),

    updateSchedule: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/schedule/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Schedule', id }, 'Schedule'],
    }),

    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Schedule'],
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useGetScheduleByIdQuery,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = scheduleApi;

