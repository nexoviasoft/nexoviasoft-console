import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API configuration
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
  // ttps://squadlog-backend.up.railway.app
  prepareHeaders: (headers, { getState }) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    
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
    'Auth',
    'User',
    'Employee',
    'Project',
    'Task',
    'TaskComment',
    'ProjectComment',
    'Column', // Project Kanban columns
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
    'EmailAlert',
    'CaseStudy',
    'Client',
    'HeroCarousel',
    'PricePackage',
    'CustomerReview',
    'OurTeam',
    'ServiceRequest',
    'OurService',
    'OurProduct',
    'Footer',
    'Order',
    'OrderMessage',
    'OrderTracking',
    'Meeting',
    'Dashboard',
  ],
  endpoints: () => ({}),
});
