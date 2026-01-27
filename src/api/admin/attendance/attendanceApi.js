import { baseApi } from "@/api/baseApi";

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAttendance: builder.query({
      query: () => "/attendance/me",
      providesTags: ["Attendance"],
    }),
    getMyAttendanceStats: builder.query({
      query: () => "/attendance/me/stats",
      providesTags: ["Attendance"],
    }),
    createAttendance: builder.mutation({
      query: (body) => ({
        url: "/attendance",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),
    updateAttendance: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/attendance/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),
    approveAttendance: builder.mutation({
      query: (id) => ({
        url: `/attendance/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Attendance"],
    }),
    getAttendanceStats: builder.query({
      query: () => "/attendance/stats",
      providesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetMyAttendanceQuery,
  useGetMyAttendanceStatsQuery,
  useCreateAttendanceMutation,
  useUpdateAttendanceMutation,
  useGetAttendanceStatsQuery,
  useApproveAttendanceMutation,
} = attendanceApi;

