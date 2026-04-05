import { baseApi } from "@/api/baseApi";

export const payrollApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayroll: builder.query({
      query: () => "/payroll",
      providesTags: ["Payroll"],
    }),
    getPayrollStats: builder.query({
      query: ({ year, month } = {}) => {
        const params = new URLSearchParams();
        if (year) params.set("year", String(year));
        if (month) params.set("month", String(month));
        const qs = params.toString();
        return `/payroll/stats${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Payroll"],
    }),
    createPayroll: builder.mutation({
      query: (data) => ({
        url: "/payroll",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payroll"],
    }),
    markPayrollPaid: builder.mutation({
      query: (id) => ({
        url: `/payroll/${id}/pay`,
        method: "PATCH",
      }),
      invalidatesTags: ["Payroll"],
    }),
    updatePayroll: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/payroll/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Payroll"],
    }),
    deletePayroll: builder.mutation({
      query: (id) => ({
        url: `/payroll/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payroll"],
    }),
  }),
});

export const {
  useGetPayrollQuery,
  useGetPayrollStatsQuery,
  useCreatePayrollMutation,
  useMarkPayrollPaidMutation,
  useUpdatePayrollMutation,
  useDeletePayrollMutation,
} = payrollApi;

