import { baseApi } from "@/api/baseApi";

export const broadcastApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBroadcastDashboard: builder.query({
      query: () => "/broadcast/dashboard",
      providesTags: ["Broadcast"],
    }),
    getBroadcastStats: builder.query({
      query: () => "/broadcast/stats",
      providesTags: ["Broadcast"],
    }),
    getBroadcasts: builder.query({
      query: () => "/broadcast",
      providesTags: ["Broadcast"],
    }),
    createBroadcast: builder.mutation({
      query: (body) => ({
        url: "/broadcast",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Broadcast"],
    }),
    updateBroadcast: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/broadcast/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Broadcast"],
    }),
    deleteBroadcast: builder.mutation({
      query: (id) => ({
        url: `/broadcast/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Broadcast"],
    }),
  }),
});

export const {
  useGetBroadcastDashboardQuery,
  useGetBroadcastStatsQuery,
  useGetBroadcastsQuery,
  useCreateBroadcastMutation,
  useUpdateBroadcastMutation,
  useDeleteBroadcastMutation,
} = broadcastApi;

