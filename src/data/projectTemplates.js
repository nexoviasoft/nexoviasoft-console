export const projectTemplates = [
  {
    id: 'software-dev',
    name: 'Software Development',
    description: 'Agile software development workflow',
    columns: [
      { id: 'backlog', title: 'Backlog', color: 'gray' },
      { id: 'todo', title: 'To-Do', color: 'blue' },
      { id: 'in-progress', title: 'In Progress', color: 'yellow' },
      { id: 'review', title: 'Review', color: 'purple' },
      { id: 'complete', title: 'Complete', color: 'green' }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing Campaign',
    description: 'Marketing and content workflow',
    columns: [
      { id: 'ideas', title: 'Ideas', color: 'gray' },
      { id: 'planning', title: 'Planning', color: 'blue' },
      { id: 'in-progress', title: 'In Progress', color: 'yellow' },
      { id: 'review', title: 'Review', color: 'purple' },
      { id: 'published', title: 'Published', color: 'green' }
    ]
  },
  {
    id: 'basic',
    name: 'Basic Workflow',
    description: 'Simple three-column board',
    columns: [
      { id: 'todo', title: 'To-Do', color: 'blue' },
      { id: 'in-progress', title: 'In Progress', color: 'yellow' },
      { id: 'complete', title: 'Complete', color: 'green' }
    ]
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Start with a blank board',
    columns: [
      { id: 'column-1', title: 'Column 1', color: 'gray' }
    ]
  }
];

export const mockEmployees = [
  { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'JS' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: 'MJ' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', avatar: 'SW' },
  { id: 5, name: 'Tom Brown', email: 'tom@example.com', avatar: 'TB' }
];
