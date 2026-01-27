import { baseApi } from '@/api/baseApi';

export const recruitmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Job Postings
    getJobPostings: builder.query({
      query: () => '/recruitment/job-postings',
      providesTags: ['Recruitment'],
    }),
    
    getJobPostingById: builder.query({
      query: (id) => `/recruitment/job-postings/${id}`,
      providesTags: (result, error, id) => [{ type: 'Recruitment', id: `job-${id}` }],
    }),
    
    createJobPosting: builder.mutation({
      query: (data) => ({
        url: '/recruitment/job-postings',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Recruitment'],
    }),
    
    updateJobPosting: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/recruitment/job-postings/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Recruitment', id: `job-${id}` }, 'Recruitment'],
    }),
    
    deleteJobPosting: builder.mutation({
      query: (id) => ({
        url: `/recruitment/job-postings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recruitment'],
    }),

    // Candidates
    getCandidates: builder.query({
      query: () => '/recruitment/candidates',
      providesTags: ['Recruitment'],
    }),
    
    getCandidateById: builder.query({
      query: (id) => `/recruitment/candidates/${id}`,
      providesTags: (result, error, id) => [{ type: 'Recruitment', id: `candidate-${id}` }],
    }),
    
    createCandidate: builder.mutation({
      query: (data) => ({
        url: '/recruitment/candidates',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Recruitment'],
    }),
    
    updateCandidate: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/recruitment/candidates/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Recruitment', id: `candidate-${id}` }, 'Recruitment'],
    }),
    
    deleteCandidate: builder.mutation({
      query: (id) => ({
        url: `/recruitment/candidates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recruitment'],
    }),

    // Interviews
    getInterviews: builder.query({
      query: () => '/recruitment/interviews',
      providesTags: ['Recruitment'],
    }),
    
    getInterviewById: builder.query({
      query: (id) => `/recruitment/interviews/${id}`,
      providesTags: (result, error, id) => [{ type: 'Recruitment', id: `interview-${id}` }],
    }),
    
    createInterview: builder.mutation({
      query: (data) => ({
        url: '/recruitment/interviews',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Recruitment'],
    }),
    
    updateInterview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/recruitment/interviews/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Recruitment', id: `interview-${id}` }, 'Recruitment'],
    }),
    
    deleteInterview: builder.mutation({
      query: (id) => ({
        url: `/recruitment/interviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recruitment'],
    }),
  }),
});

export const {
  useGetJobPostingsQuery,
  useGetJobPostingByIdQuery,
  useCreateJobPostingMutation,
  useUpdateJobPostingMutation,
  useDeleteJobPostingMutation,
  useGetCandidatesQuery,
  useGetCandidateByIdQuery,
  useCreateCandidateMutation,
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
  useGetInterviewsQuery,
  useGetInterviewByIdQuery,
  useCreateInterviewMutation,
  useUpdateInterviewMutation,
  useDeleteInterviewMutation,
} = recruitmentApi;
