import { baseApi } from '@/api/baseApi';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all orders
    getOrders: builder.query({
      query: () => '/order',
      providesTags: ['Order'],
    }),
    
    // Get order stats
    getOrderStats: builder.query({
      query: () => '/order/stats',
      providesTags: ['Order'],
    }),
    
    // Get single order by ID (numeric ID or orderId string)
    getOrderById: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    
    // Create new order
    createOrder: builder.mutation({
      query: (data) => ({
        url: '/order',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    
    // Update order
    updateOrder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/order/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }, 'Order'],
    }),
    
    // Delete order
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),

    // Order Messages
    getOrderMessages: builder.query({
      query: (orderId) => `/order-messages/order/${orderId}`,
      providesTags: (result, error, orderId) => [{ type: 'OrderMessage', id: `order-${orderId}` }],
    }),
    
    createOrderMessage: builder.mutation({
      query: (data) => ({
        url: '/order-messages',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { orderId }) => [{ type: 'OrderMessage', id: `order-${orderId}` }],
    }),
    
    deleteOrderMessage: builder.mutation({
      query: (id) => ({
        url: `/order-messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OrderMessage'],
    }),

    // Order Tracking
    getOrderTracking: builder.query({
      query: (orderId) => `/order-tracking/order/${orderId}`,
      providesTags: (result, error, orderId) => [{ type: 'OrderTracking', id: `order-${orderId}` }],
    }),
    
    createOrderTracking: builder.mutation({
      query: (data) => ({
        url: '/order-tracking',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'OrderTracking', id: `order-${orderId}` },
        { type: 'Order', id: orderId },
        'Order',
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderStatsQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderMessagesQuery,
  useCreateOrderMessageMutation,
  useDeleteOrderMessageMutation,
  useGetOrderTrackingQuery,
  useCreateOrderTrackingMutation,
} = orderApi;
