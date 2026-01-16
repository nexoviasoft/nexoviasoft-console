import { baseApi } from '@/api/baseApi';

export const caseStudiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all case studies
    getCaseStudies: builder.query({
      query: () => '/case-studies',
      providesTags: ['CaseStudy'],
    }),
    
    // Get single case study by ID
    getCaseStudyById: builder.query({
      query: (id) => `/case-studies/${id}`,
      providesTags: (result, error, id) => [{ type: 'CaseStudy', id }],
    }),
    
    // Create new case study
    createCaseStudy: builder.mutation({
      query: (data) => ({
        url: '/case-studies',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CaseStudy'],
    }),
    
    // Update case study
    updateCaseStudy: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/case-studies/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'CaseStudy', id }, 'CaseStudy'],
    }),
    
    // Delete case study
    deleteCaseStudy: builder.mutation({
      query: (id) => ({
        url: `/case-studies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CaseStudy'],
    }),
  }),
});

export const {
  useGetCaseStudiesQuery,
  useGetCaseStudyByIdQuery,
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  useDeleteCaseStudyMutation,
} = caseStudiesApi;
