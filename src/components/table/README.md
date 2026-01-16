# Modern Pagination System

This directory contains the updated pagination components for the admin tables, designed to match the modern pagination design shown in the reference image.

## Components

### 1. ModernPagination (`modern-pagination.jsx`)

A new pagination component that provides:

- **Items per page dropdown** with options (10, 25, 50, 100)
- **Item count display** showing "1-25 of 500 items"
- **Navigation controls** including:
  - Go to first page (double left arrow)
  - Previous page button
  - Current page input field
  - Total pages display
  - Next page button
  - Go to last page (double right arrow)

### 2. Updated ReusableTable (`reusable-table.jsx`)

The main table component has been updated to:

- Use the new ModernPagination component
- Support external pagination data
- Handle items per page changes
- Provide better pagination state management

## Features

### ✅ Implemented

- Modern pagination design matching the reference image
- Items per page selection (10, 25, 50, 100)
- Page navigation with first/last page buttons
- Current page input field
- Item count display
- Responsive design with dark mode support
- Integration with existing admin tables

### 🔧 Technical Details

- **State Management**: Uses React hooks for pagination state
- **API Integration**: Supports external pagination data from APIs
- **Event Handling**: Callbacks for page changes and items per page changes
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Styling**: Tailwind CSS with dark mode support

## Usage

### Basic Usage

```jsx
import ModernPagination from "@/components/table/modern-pagination";

<ModernPagination
  totalItems={500}
  itemsPerPage={25}
  totalPages={20}
  currentPage={1}
  onPageChange={(page) => setCurrentPage(page)}
  onItemsPerPageChange={(newSize) => setPageSize(newSize)}
/>;
```

### In ReusableTable

```jsx
<ReusableTable
  data={tableData}
  headers={tableHeaders}
  isLoading={isLoading}
  pageSize={pageSize}
  currentPage={currentPage}
  onPageChange={handlePageChange}
  // External pagination data
  externalTotal={totalItems}
  externalTotalPages={totalPages}
  // Other props...
/>
```

## Admin Pages Updated

The following admin pages have been updated to use the new pagination system:

1. **Blog Categories** (`/admin/settings/Blog-Categories.jsx`)
2. **Blog Management** (`/admin/blog-management/BlogMangement.jsx`)
3. **YouTube Video Management** (`/admin/youtube-video/YoutubeVideoMangement.jsx`)
4. **District Management** (`/admin/settings/District.jsx`)

## Demo

A demo component is available at `pagination-demo.jsx` that showcases:

- Different pagination scenarios
- Interactive page navigation
- Items per page changes
- State management examples

## Styling

The pagination component uses:

- **Colors**: Blue for active states, gray for inactive
- **Typography**: Consistent with the design system
- **Spacing**: Proper padding and margins for touch targets
- **Borders**: Subtle borders for visual separation
- **Hover States**: Interactive feedback for better UX

## Future Enhancements

Potential improvements for future versions:

- Custom items per page options
- Page size persistence in localStorage
- Keyboard shortcuts for navigation
- URL state synchronization
- Advanced filtering integration

## Migration Guide

### From Old Pagination

1. Replace the old pagination section with the new ModernPagination component
2. Add `pageSize` state management
3. Update API calls to use the new page size
4. Add external pagination data props to ReusableTable

### Example Migration

```jsx
// Before
const [currentPage, setCurrentPage] = useState(1);
const pageSize = 10;

// After
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

const handlePageSizeChange = (newPageSize) => {
  setPageSize(newPageSize);
  setCurrentPage(1);
};
```

## Support

For questions or issues with the pagination system, refer to:

- Component documentation in this README
- Demo component for usage examples
- Existing admin page implementations for reference patterns

