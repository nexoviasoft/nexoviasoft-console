import { baseApi } from "@/api/baseApi";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportsDashboard: builder.query({
      query: ({ from, to } = {}) => {
        const params = new URLSearchParams();
        if (from) params.set("from", from);
        if (to) params.set("to", to);
        const qs = params.toString();
        return `/reports/dashboard${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Report"],
    }),
  }),
});

export const { useGetReportsDashboardQuery } = reportsApi;

