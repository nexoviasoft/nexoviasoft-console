import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API configuration
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://squadlog-backend.up.railway.app',
  prepareHeaders: (headers, { getState }) => {
    // Get token from state if you have auth state
    // const token = getState()?.auth?.token;
    // if (token) {
    //   headers.set('authorization', `Bearer ${token}`);
    // }
    
    // Set default headers
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Base API slice with RTK Query
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'User',
    'Employee',
    'Project',
    'Attendance',
    'Leave',
    'Payroll',
    'Document',
    'Recruitment',
    'Schedule',
    'Report',
    'Category',
    'Department',
    'Broadcast',
    'Email',
    'CaseStudy',
    'Client',
    'HeroCarousel',
    'PricePackage',
    'CustomerReview',
  ],
  endpoints: () => ({}),
});
