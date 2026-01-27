import { baseApi } from "@/api/baseApi";

export const meetingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMeeting: builder.mutation({
      query: (data) => ({
        url: "/meeting",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Meeting"],
    }),

    getMeetings: builder.query({
      query: () => "/meeting",
      providesTags: ["Meeting"],
    }),
  }),
});

export const { useCreateMeetingMutation, useGetMeetingsQuery } = meetingApi;

