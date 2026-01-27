import { baseApi } from "@/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query({
      query: () => "/dashboard/summary",
      providesTags: ["Dashboard"],
    }),
    getAttendanceTrend: builder.query({
      query: (period = "Weekly") =>
        `/dashboard/attendance-trend?period=${encodeURIComponent(period)}`,
      providesTags: ["Dashboard"],
    }),
    getFinanceTrend: builder.query({
      query: (period = "Yearly") =>
        `/dashboard/finance-trend?period=${encodeURIComponent(period)}`,
      providesTags: ["Dashboard"],
    }),
    getDashboardActivity: builder.query({
      query: (tab = "Attendance") =>
        `/dashboard/activity?tab=${encodeURIComponent(tab)}`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetAttendanceTrendQuery,
  useGetFinanceTrendQuery,
  useGetDashboardActivityQuery,
} = dashboardApi;

