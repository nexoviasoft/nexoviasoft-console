import { baseApi } from '@/api/baseApi';

export const heroCarouselApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all hero carousels
    getHeroCarousels: builder.query({
      query: () => '/hero-crasol',
      providesTags: ['HeroCarousel'],
    }),
    
    // Get single hero carousel by ID
    getHeroCarouselById: builder.query({
      query: (id) => `/hero-crasol/${id}`,
      providesTags: (result, error, id) => [{ type: 'HeroCarousel', id }],
    }),
    
    // Create new hero carousel
    createHeroCarousel: builder.mutation({
      query: (data) => ({
        url: '/hero-crasol',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['HeroCarousel'],
    }),
    
    // Update hero carousel
    updateHeroCarousel: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/hero-crasol/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'HeroCarousel', id }, 'HeroCarousel'],
    }),
    
    // Delete hero carousel
    deleteHeroCarousel: builder.mutation({
      query: (id) => ({
        url: `/hero-crasol/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['HeroCarousel'],
    }),
  }),
});

export const {
  useGetHeroCarouselsQuery,
  useGetHeroCarouselByIdQuery,
  useCreateHeroCarouselMutation,
  useUpdateHeroCarouselMutation,
  useDeleteHeroCarouselMutation,
} = heroCarouselApi;
