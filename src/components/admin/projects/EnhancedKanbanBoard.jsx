"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateTaskMutation, useGetTasksQuery, useMoveTaskMutation } from "@/api/admin/projects/tasksApi";
import { useCreateTaskCommentMutation } from "@/api/admin/projects/taskCommentsApi";
import { useGetColumnsQuery, useCreateColumnMutation, useDeleteColumnMutation } from "@/api/admin/projects/columnsApi";
import { useGetOurTeamQuery } from "@/api/admin/our-team/ourTeamApi";
import { useGetDepartmentsQuery } from "@/api/landing/department/departmentApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  MessageSquare,
  Plus,
  X,
  ListTodo,
  Boxes,
  Layout,
  Code2,
  Megaphone,
  Palette,
  Users,
  DollarSign,
  Settings,
  Calendar,
  CheckCircle2,
  Briefcase,
  Tag,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

const templates = [
  {
    id: "scrum",
    name: "Scrum",
    description:
      "Designed for teams using time-boxed sprints to deliver incremental value.",
    columns: [
      { id: "todo", title: "Sprint Backlog", isCustom: false, order: 1 },
      { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
      { id: "review", title: "Review", isCustom: false, order: 3 },
      { id: "complete", title: "Done", isCustom: false, order: 4 },
    ],
  },
  {
    id: "kanban",
    name: "Kanban",
    description:
      "Ideal for managing a continuous flow of work with work-in-progress (WIP) limits.",
    columns: [
      { id: "todo", title: "To-Do", isCustom: false, order: 1 },
      { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
      { id: "review", title: "Review", isCustom: false, order: 3 },
      { id: "complete", title: "Done", isCustom: false, order: 4 },
    ],
  },
  {
    id: "bug_tracking",
    name: "Bug Tracking",
    description:
      "Used to capture, track, prioritize, and resolve software defects.",
    columns: [
      { id: "todo", title: "To Triage", isCustom: false, order: 1 },
      { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
      { id: "review", title: "In Review", isCustom: false, order: 3 },
      { id: "complete", title: "Resolved", isCustom: false, order: 4 },
    ],
  },
  {
    id: "project_management",
    name: "Project Management",
    description:
      "General-purpose template for managing business projects and tasks.",
    columns: [
      { id: "todo", title: "To-Do", isCustom: false, order: 1 },
      { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
      { id: "review", title: "Review", isCustom: false, order: 3 },
      { id: "complete", title: "Complete", isCustom: false, order: 4 },
    ],
  },
  {
    id: "devops",
    name: "DevOps",
    description:
      "Supports software development, deployment, monitoring, and operations workflows.",
    columns: [
      { id: "todo", title: "Backlog", isCustom: false, order: 1 },
      { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
      { id: "review", title: "Testing", isCustom: false, order: 3 },
      { id: "complete", title: "Deployed", isCustom: false, order: 4 },
    ],
  },
  {
    id: "itsm",
    name: "IT Service Management (ITSM)",
    description:
      "For managing incidents, service requests, problems, and service delivery.",
    columns: [
      { id: "todo", title: "New", isCustom: false, order: 1 },
      { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
      { id: "review", title: "Pending", isCustom: false, order: 3 },
      { id: "complete", title: "Resolved", isCustom: false, order: 4 },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Campaign management, content calendars, and lead tracking.",
    columns: [
      { id: "todo", title: "Ideas", isCustom: false, order: 1 },
      { id: "inprogress", title: "Planning", isCustom: false, order: 2 },
      { id: "review", title: "In Progress", isCustom: false, order: 3 },
      { id: "complete", title: "Launched", isCustom: false, order: 4 },
    ],
  },
  {
    id: "design",
    name: "Design",
    description:
      "UX/UI projects, creative workflows, and digital asset management.",
    columns: [
      { id: "todo", title: "Brief", isCustom: false, order: 1 },
      { id: "inprogress", title: "In Design", isCustom: false, order: 2 },
      { id: "review", title: "In Review", isCustom: false, order: 3 },
      { id: "complete", title: "Approved", isCustom: false, order: 4 },
    ],
  },
  {
    id: "hr",
    name: "Human Resources (HR)",
    description:
      "Employee onboarding, recruitment pipelines, and internal HR processes.",
    columns: [
      { id: "todo", title: "Pipeline", isCustom: false, order: 1 },
      { id: "inprogress", title: "Interviewing", isCustom: false, order: 2 },
      { id: "review", title: "Offer", isCustom: false, order: 3 },
      { id: "complete", title: "Onboarding", isCustom: false, order: 4 },
    ],
  },
  {
    id: "sales",
    name: "Sales",
    description: "Sales pipelines, opportunity tracking, and deal management.",
    columns: [
      { id: "todo", title: "Leads", isCustom: false, order: 1 },
      { id: "inprogress", title: "Contacted", isCustom: false, order: 2 },
      { id: "review", title: "Proposal", isCustom: false, order: 3 },
      { id: "complete", title: "Closed", isCustom: false, order: 4 },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    description:
      "Procurement, process management, compliance, and policy tracking.",
    columns: [
      { id: "todo", title: "Backlog", isCustom: false, order: 1 },
      { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
      { id: "review", title: "Review", isCustom: false, order: 3 },
      { id: "complete", title: "Complete", isCustom: false, order: 4 },
    ],
  },
  {
    id: "task_tracking",
    name: "Task Tracking",
    description: "Simple task organization for individuals or teams.",
    columns: [
      { id: "todo", title: "To-Do", isCustom: false, order: 1 },
      { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
      { id: "review", title: "Review", isCustom: false, order: 3 },
      { id: "complete", title: "Done", isCustom: false, order: 4 },
    ],
  },
  {
    id: "event_planning",
    name: "Event Planning",
    description: "Managing event timelines, responsibilities, and logistics.",
    columns: [
      { id: "todo", title: "Planning", isCustom: false, order: 1 },
      { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
      { id: "review", title: "On Hold", isCustom: false, order: 3 },
      { id: "complete", title: "Complete", isCustom: false, order: 4 },
    ],
  },
  {
    id: "fdd",
    name: "Feature-Driven Development (FDD)",
    description: "Organizing work around feature delivery.",
    columns: [
      { id: "todo", title: "Feature List", isCustom: false, order: 1 },
      { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
      { id: "review", title: "In Review", isCustom: false, order: 3 },
      { id: "complete", title: "Complete", isCustom: false, order: 4 },
    ],
  },
  {
    id: "tdd",
    name: "Test-Driven Development (TDD)",
    description: "Supporting test-first development workflows.",
    columns: [
      { id: "todo", title: "Tests Planned", isCustom: false, order: 1 },
      { id: "inprogress", title: "Tests Written", isCustom: false, order: 2 },
      { id: "review", title: "Code Implemented", isCustom: false, order: 3 },
      { id: "complete", title: "Verified", isCustom: false, order: 4 },
    ],
  },
  {
    id: "custom",
    name: "Custom Templates",
    description:
      "User-defined templates with custom fields, workflows, and boards.",
    columns: [
      { id: "todo", title: "To-Do", isCustom: false, order: 1 },
      { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
      { id: "review", title: "Review", isCustom: false, order: 3 },
      { id: "complete", title: "Complete", isCustom: false, order: 4 },
    ],
  },
];

const initialColumns = templates.find(
  (template) => template.id === "project_management",
)?.columns || [
  { id: "todo", title: "To-Do", isCustom: false, order: 1 },
  { id: "inprogress", title: "In Progress", isCustom: false, order: 2 },
  { id: "review", title: "Review", isCustom: false, order: 3 },
  { id: "complete", title: "Complete", isCustom: false, order: 4 },
];

// Helper function to transform API tasks into the format expected by the component
const transformTasksFromAPI = (apiTasks, columns) => {
  if (!apiTasks || !Array.isArray(apiTasks)) {
    return {};
  }
  
  const tasksByColumn = {};
  
  // Initialize all columns with empty arrays
  columns.forEach(column => {
    tasksByColumn[column.id] = [];
  });
  
  // Group tasks by columnId
  apiTasks.forEach(task => {
    const columnId = task.columnId || 'todo'; // Default to 'todo' if no columnId
    if (!tasksByColumn[columnId]) {
      tasksByColumn[columnId] = [];
    }
    
    tasksByColumn[columnId].push({
      id: String(task.id),
      title: task.title || "",
      desc: task.description || "",
      priority: task.priority || "medium",
      status: task.status || "todo",
      assignees: task.assignees || [],
      dueDate: task.dueDate || "",
      team: task.team || "",
      columnId: task.columnId || columnId,
      order: task.order || 0,
    });
  });
  
  // Sort tasks by order within each column
  Object.keys(tasksByColumn).forEach(columnId => {
    tasksByColumn[columnId].sort((a, b) => (a.order || 0) - (b.order || 0));
  });
  
  return tasksByColumn;
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    high: "bg-red-100 text-red-600",
    medium: "bg-orange-100 text-orange-600",
    low: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        styles[priority] || styles.low
      }`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

const KanbanTaskCard = ({
  task,
  columnId,
  theme,
  onDragStart,
  onOpenTask,
  expandedCommentTaskId,
  setExpandedCommentTaskId,
  getCommentCount,
  taskComments,
  newComments,
  handleCommentInputChange,
  handleAddComment,
}) => {
  return (
    <Card
      className={` border bg-black/40 ${theme.border} rounded-xl`}
      draggable
      onDragStart={(event) => onDragStart(event, task, columnId)}
      onClick={() => onOpenTask(task, columnId)}
    >
      <CardContent className="p-3 md:p-4 space-y-2 md:space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-white leading-tight text-sm md:text-base">
            {task.title}
          </h4>
        </div>

        {task.desc && (
          <p className="text-xs text-white/60 line-clamp-1 md:line-clamp-2">
            {task.desc}
          </p>
        )}

        <PriorityBadge priority={task.priority} />

        <div className="pt-2 flex items-center justify-between border-t border-white/10 mt-2">
          <div className="flex -space-x-2">
            {task.assignees.map((initials, index) => (
              <Avatar
                key={initials + index}
                className="w-6 h-6 border-2 border-white"
              >
                <AvatarFallback className={`${theme.bg} ${theme.text} text-xs`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <button
            type="button"
            className={`flex items-center gap-1 text-gray-400 hover:${theme.text} text-xs`}
            onClick={(event) => {
              event.stopPropagation();
              setExpandedCommentTaskId((prev) =>
                prev === task.id ? null : task.id,
              );
            }}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{getCommentCount(task.id)}</span>
          </button>
        </div>

        {expandedCommentTaskId === task.id && (
          <div className="mt-3 space-y-2 border-t border-gray-100 pt-2">
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {(taskComments[task.id] || []).length === 0 && (
                <p className="text-xs text-white/70">
                  No comments yet. Start the discussion for this task.
                </p>
              )}
              {(taskComments[task.id] || []).map((comment) => (
                <div
                  key={comment.id}
                  className="text-xs text-white/70 bg-white/5 border border-white/10 rounded-md px-2 py-1"
                >
                  <span className="font-medium mr-1">{comment.author}:</span>
                  <span>{comment.text}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <Textarea
                rows={2}
                placeholder="Add a comment..."
                className="text-xs"
                value={newComments[task.id] || ""}
                onChange={(event) =>
                  handleCommentInputChange(task.id, event.target.value)
                }
                onClick={(event) => event.stopPropagation()}
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  size="sm"
                  className="h-7 px-3 text-xs"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddComment(task.id);
                  }}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const KanbanColumn = ({
  column,
  tasks,
  theme,
  onDragOver,
  onDrop,
  onDeleteColumn,
  onAddTask,
  ...taskProps
}) => {
  return (
    <div
      className="w-[42vw] md:w-80 shrink-0 flex flex-col gap-4 first:pl-1 last:pr-1"
      onDragOver={onDragOver}
      onDrop={(event) => onDrop(event, column.id)}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white text-sm uppercase">
            {column.title}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${theme.badge}`}
          >
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {column.isCustom && (
            <button
              type="button"
              onClick={() => onDeleteColumn(column.id)}
              className="text-gray-400 hover:text-red-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {tasks.map((task) => (
        <KanbanTaskCard
          key={task.id}
          task={task}
          columnId={column.id}
          theme={theme}
          {...taskProps}
        />
      ))}

      <button
        type="button"
        onClick={() => onAddTask(column.id)}
        className="flex items-center gap-2 py-2 w-full justify-center rounded-lg border border-dashed border-[#EFFC76]/60 text-[#EFFC76] hover:bg-[#EFFC76]/10 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Add Task</span>
      </button>
    </div>
  );
};

export default function EnhancedKanbanBoard({ applicationType, projectId }) {
  // STRICT VALIDATION - Ensure props are primitives only
  // Convert applicationType to string
  let safeApplicationType = '';
  if (typeof applicationType === 'string') {
    safeApplicationType = applicationType;
  } else if (applicationType && typeof applicationType === 'object') {
    console.error('ERROR: applicationType is an object!', applicationType);
    safeApplicationType = String(applicationType.name || applicationType.value || '');
  } else {
    safeApplicationType = String(applicationType || '');
  }
  
  // Convert projectId to number
  let safeProjectId = 0;
  if (typeof projectId === 'number' && !isNaN(projectId) && isFinite(projectId)) {
    safeProjectId = projectId;
  } else if (typeof projectId === 'string') {
    const num = parseInt(projectId, 10);
    safeProjectId = isNaN(num) ? 0 : num;
  } else if (projectId && typeof projectId === 'object') {
    console.error('ERROR: projectId is an object!', projectId);
    const numId = projectId.id || projectId.value || projectId.projectId;
    if (numId !== undefined && numId !== null) {
      const num = typeof numId === 'number' ? numId : parseInt(String(numId), 10);
      safeProjectId = isNaN(num) ? 0 : num;
    }
  }
  
  // Early return if invalid
  if (!safeProjectId || safeProjectId <= 0) {
    return (
      <div className="text-white/60 text-center py-8">
        Invalid project ID
      </div>
    );
  }
  
  const router = useRouter();
  const [createTask, { isLoading: isCreatingTask }] = useCreateTaskMutation();
  const [createTaskComment, { isLoading: isCreatingComment }] = useCreateTaskCommentMutation();
  const [moveTask, { isLoading: isMovingTask }] = useMoveTaskMutation();
  const [createColumn, { isLoading: isCreatingColumn }] = useCreateColumnMutation();
  const [deleteColumn, { isLoading: isDeletingColumn }] = useDeleteColumnMutation();
  
  // Fetch columns from API if projectId is provided
  const { data: columnsResponse, isLoading: isLoadingColumns, refetch: refetchColumns } = useGetColumnsQuery(
    safeProjectId,
    { skip: !safeProjectId || safeProjectId <= 0 }
  );
  
  // Fetch tasks from API if projectId is provided
  const { data: tasksResponse, isLoading: isLoadingTasks, refetch: refetchTasks } = useGetTasksQuery(
    safeProjectId,
    { skip: !safeProjectId || safeProjectId <= 0 }
  );
  
  // Fetch team members and departments from API
  const { data: teamMembersResponse } = useGetOurTeamQuery();
  const { data: departmentsResponse } = useGetDepartmentsQuery();
  
  // Extract data from API responses
  const teamMembers = Array.isArray(teamMembersResponse) 
    ? teamMembersResponse 
    : (teamMembersResponse?.data || []);
  
  const departments = Array.isArray(departmentsResponse) 
    ? departmentsResponse 
    : (departmentsResponse?.data || []);
  
  // Transform API columns to component format (convert numeric id to string)
  // Merge default columns with API columns to ensure defaults are always shown
  const transformedColumns = useMemo(() => {
    // Always start with default columns
    const defaultColumns = [...initialColumns];
    
    // If we have API columns, add custom ones
    if (projectId && columnsResponse) {
      const apiColumns = Array.isArray(columnsResponse) 
        ? columnsResponse 
        : (columnsResponse?.data || []);
      
      if (apiColumns.length > 0) {
        // Get default column titles for comparison
        const defaultTitles = new Set(defaultColumns.map(col => col.title.toLowerCase()));
        
        // Filter out custom columns (those not matching default titles)
        const customColumns = apiColumns
          .filter(column => {
            // Only include if it's marked as custom OR doesn't match any default title
            return column.isCustom || !defaultTitles.has(column.title.toLowerCase());
          })
          .map(column => ({
            id: String(column.id), // Convert numeric id to string
            title: column.title,
            isCustom: column.isCustom !== false, // Default to true if not specified
            order: column.order || defaultColumns.length + 1,
          }));
        
        // Merge: default columns first, then custom columns
        return [...defaultColumns, ...customColumns].sort((a, b) => {
          // Default columns (isCustom: false) come first, sorted by their order
          if (!a.isCustom && !b.isCustom) {
            return (a.order || 0) - (b.order || 0);
          }
          // Custom columns come after defaults
          if (a.isCustom !== b.isCustom) {
            return a.isCustom ? 1 : -1;
          }
          // Sort custom columns by order
          return (a.order || 0) - (b.order || 0);
        });
      }
    }
    
    // Return default columns if no API data
    return defaultColumns;
  }, [columnsResponse, projectId]);
  
  const [columns, setColumns] = useState(transformedColumns);
  
  // Update columns when API data changes
  useEffect(() => {
    setColumns(transformedColumns);
  }, [transformedColumns]);
  
  // Extract tasks from API response
  const apiTasks = Array.isArray(tasksResponse) 
    ? tasksResponse 
    : (tasksResponse?.data || []);
  
  // Transform API tasks into component format
  const transformedTasks = useMemo(() => {
    if (safeProjectId) {
      // If we have a projectId, use API data (even if empty)
      return transformTasksFromAPI(apiTasks, columns);
    }
    // Return empty tasks if no projectId (for demo/mock mode)
    const emptyTasks = {};
    columns.forEach(col => {
      emptyTasks[col.id] = [];
    });
    return emptyTasks;
  }, [apiTasks, columns, safeProjectId]);
  
  // Initialize tasks state - use ref to prevent infinite loops
  const tasksRef = React.useRef(transformedTasks);
  const [tasks, setTasks] = useState(transformedTasks);
  
  // Extract and transform comments from API tasks
  const transformedComments = useMemo(() => {
    if (!safeProjectId || !apiTasks || !Array.isArray(apiTasks)) {
      return {};
    }
    
    const commentsByTask = {};
    apiTasks.forEach(task => {
      if (task.comments && Array.isArray(task.comments) && task.comments.length > 0) {
        commentsByTask[String(task.id)] = task.comments.map(comment => ({
          id: String(comment.id),
          author: comment.author || "Unknown",
          text: comment.content || "",
          createdAt: comment.createdAt,
        }));
      }
    });
    
    return commentsByTask;
  }, [apiTasks, safeProjectId]);
  
  const commentsRef = React.useRef(transformedComments);
  const [taskComments, setTaskComments] = useState(transformedComments);
  
  // Update tasks only when apiTasks or columns actually change
  useEffect(() => {
    const newTasks = transformTasksFromAPI(apiTasks, columns);
    const newTasksStr = JSON.stringify(newTasks);
    const currentTasksStr = JSON.stringify(tasksRef.current);
    
    if (newTasksStr !== currentTasksStr) {
      tasksRef.current = newTasks;
      setTasks(newTasks);
    }
  }, [apiTasks, columns]);
  
  // Update comments only when apiTasks actually change
  useEffect(() => {
    const newCommentsStr = JSON.stringify(transformedComments);
    const currentCommentsStr = JSON.stringify(commentsRef.current);
    
    if (newCommentsStr !== currentCommentsStr) {
      commentsRef.current = transformedComments;
      setTaskComments(transformedComments);
    }
  }, [apiTasks]);
  
  const [showColumnDialog, setShowColumnDialog] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [expandedCommentTaskId, setExpandedCommentTaskId] = useState(null);
  const [newComments, setNewComments] = useState({});
  const [selectedTemplateId, setSelectedTemplateId] = useState("project_management");
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  
  // Add Task Dialog State
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    desc: "",
    priority: "medium",
    dueDate: "",
    team: "",
    assignees: [],
  });
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

  // Create assignees list from team members (format: initials)
  // Filter by selected department if a department is selected
  const availableMembers = useMemo(() => {
    let filteredMembers = teamMembers;
    
    // Filter by selected department if one is selected
    if (selectedDepartmentId) {
      filteredMembers = teamMembers.filter(member => 
        member.departmentId === Number(selectedDepartmentId)
      );
    }
    
    return filteredMembers.map((member) => {
      const initials = (member.firstName?.[0] || '') + (member.lastName?.[0] || '') || 'TM';
      return {
        id: member.id,
        initials,
        name: `${member.firstName} ${member.lastName}`,
        fullName: `${member.firstName} ${member.lastName}`,
        departmentId: member.departmentId,
      };
    });
  }, [teamMembers, selectedDepartmentId]);
  
  // Create teams list from departments (department names)
  const teamsList = useMemo(() => {
    return departments.map((dept) => dept.name);
  }, [departments]);
  
  // Reset team member selection when department changes
  useEffect(() => {
    if (selectedDepartmentId) {
      setNewTaskData(prev => ({ ...prev, assignees: [] }));
    }
  }, [selectedDepartmentId]);

  const getThemeColor = (type) => {
    switch (type) {
      case "Web Application":
        return {
          text: "text-purple-300",
          bg: "bg-purple-500/10",
          border: "border-purple-500/20",
          hoverBorder: "hover:border-purple-500/50",
          badge: "bg-purple-500/15 text-purple-300 border-purple-400/30",
          icon: "text-purple-400",
        };
      case "Mobile Application":
        return {
          text: "text-orange-300",
          bg: "bg-orange-500/10",
          border: "border-orange-500/20",
          hoverBorder: "hover:border-orange-500/50",
          badge: "bg-orange-500/15 text-orange-300 border-orange-400/30",
          icon: "text-orange-400",
        };
      case "Backend Service":
        return {
          text: "text-blue-300",
          bg: "bg-blue-500/10",
          border: "border-blue-500/20",
          hoverBorder: "hover:border-blue-500/50",
          badge: "bg-blue-500/15 text-blue-300 border-blue-400/30",
          icon: "text-blue-400",
        };
      case "Database Layer":
        return {
          text: "text-emerald-300",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
          hoverBorder: "hover:border-emerald-500/50",
          badge: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
          icon: "text-emerald-400",
        };
      default:
        return {
          text: "text-[#EFFC76]",
          bg: "bg-[#EFFC76]/10",
          border: "border-[#EFFC76]/20",
          hoverBorder: "hover:border-[#EFFC76]/50",
          badge: "bg-[#EFFC76]/15 text-[#EFFC76] border-[#EFFC76]/30",
          icon: "text-[#EFFC76]",
        };
    }
  };

  const theme = getThemeColor(applicationType);

  const handleAddColumn = async () => {
    if (!newColumnName.trim()) return;

    // If projectId is provided, use API
    if (projectId) {
      try {
        const columnData = {
          projectId: Number(projectId),
          title: newColumnName.trim(),
          isCustom: true,
          order: columns.length + 1,
        };

        const result = await createColumn(columnData).unwrap();
        
        // Transform API response to component format
        const newColumn = {
          id: String(result.id),
          title: result.title,
          isCustom: result.isCustom || true,
          order: result.order || columns.length + 1,
        };

        // Optimistically update UI
        setColumns([...columns, newColumn]);
        setTasks({ ...tasks, [newColumn.id]: [] });
        
        // Refetch columns to get latest data
        if (refetchColumns) {
          await refetchColumns();
        }

        setNewColumnName("");
        setShowColumnDialog(false);
        toast.success("Column added successfully");
      } catch (error) {
        console.error("Failed to create column:", error);
        toast.error("Failed to create column");
      }
    } else {
      // Fallback to local state if no projectId
      const newColumn = {
        id: `custom_${Date.now()}`,
        title: newColumnName,
        isCustom: true,
        order: columns.length + 1,
      };

      setColumns([...columns, newColumn]);
      setTasks({ ...tasks, [newColumn.id]: [] });
      setNewColumnName("");
      setShowColumnDialog(false);
      toast.success("Column added successfully");
    }
  };

  const handleDeleteColumn = async (columnId) => {
    if (tasks[columnId]?.length > 0) {
      toast.error("Cannot delete column with tasks");
      return;
    }

    // If projectId is provided, use API
    if (projectId) {
      try {
        const columnIdNum = Number(columnId);
        
        await deleteColumn({ 
          id: columnIdNum, 
          projectId: Number(projectId) 
        }).unwrap();

        // Optimistically update UI
        setColumns(columns.filter((column) => column.id !== columnId));
        const nextTasks = { ...tasks };
        delete nextTasks[columnId];
        setTasks(nextTasks);

        // Refetch columns to get latest data
        if (refetchColumns) {
          await refetchColumns();
        }

        toast.success("Column deleted");
      } catch (error) {
        console.error("Failed to delete column:", error);
        toast.error("Failed to delete column");
      }
    } else {
      // Fallback to local state if no projectId
      setColumns(columns.filter((column) => column.id !== columnId));
      const nextTasks = { ...tasks };
      delete nextTasks[columnId];
      setTasks(nextTasks);
      toast.success("Column deleted");
    }
  };

  const handleDragStart = (event, task, sourceColumn) => {
    setDraggedTask({ task, sourceColumn });
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (event, targetColumn) => {
    event.preventDefault();
    if (!draggedTask) return;

    const { task, sourceColumn } = draggedTask;

    if (sourceColumn === targetColumn) {
      setDraggedTask(null);
      return;
    }

    // Optimistically update UI
    const nextTasks = { ...tasks };
    nextTasks[sourceColumn] = nextTasks[sourceColumn].filter(
      (item) => item.id !== task.id,
    );
    nextTasks[targetColumn] = [...(nextTasks[targetColumn] || []), task];
    setTasks(nextTasks);
    setDraggedTask(null);

    const columnTitle = columns.find(
      (column) => column.id === targetColumn,
    )?.title;

    // If projectId is provided, use API
    if (projectId) {
      try {
        // Calculate new order (position in target column)
        const targetTasks = nextTasks[targetColumn] || [];
        const newOrder = targetTasks.length - 1; // Last position in the column

        const moveData = {
          taskId: Number(task.id),
          newColumnId: targetColumn,
          newOrder: newOrder,
          projectId: Number(projectId), // Include projectId for cache invalidation
        };

        await moveTask(moveData).unwrap();

        // Refetch tasks to get the latest data
        if (refetchTasks) {
          await refetchTasks();
        }

        if (columnTitle) {
          toast.success(`Task moved to ${columnTitle}`);
        }
      } catch (error) {
        console.error("Failed to move task:", error);
        toast.error("Failed to move task. Reverting...");
        
        // Revert optimistic update
        const revertedTasks = { ...tasks };
        revertedTasks[sourceColumn] = [...(revertedTasks[sourceColumn] || []), task];
        revertedTasks[targetColumn] = revertedTasks[targetColumn].filter(
          (item) => item.id !== task.id,
        );
        setTasks(revertedTasks);
      }
    } else {
      // Fallback to local state if no projectId
      if (columnTitle) {
        toast.success(`Task moved to ${columnTitle}`);
      }
    }
  };

  const handleAddTask = (columnId) => {
    setActiveColumnId(columnId);
    setSelectedDepartmentId("");
    setNewTaskData({
      title: "",
      desc: "",
      priority: "medium",
      dueDate: "",
      team: "",
      assignees: [],
    });
    setAddTaskDialogOpen(true);
  };

  const handleCreateTask = async () => {
    if (!newTaskData.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    // If projectId is provided, use API
    if (projectId) {
      try {
        const taskData = {
          projectId: Number(projectId),
          title: newTaskData.title,
          description: newTaskData.desc || undefined,
          priority: newTaskData.priority,
          status: "todo",
          columnId: activeColumnId,
          dueDate: newTaskData.dueDate || undefined,
          team: newTaskData.team || undefined,
          assignees: newTaskData.assignees || [],
        };

        const result = await createTask(taskData).unwrap();
        
        // Refetch tasks from API to get the latest data
        if (refetchTasks) {
          await refetchTasks();
        }

        setAddTaskDialogOpen(false);
        setSelectedDepartmentId("");
        setNewTaskData({
          title: "",
          desc: "",
          priority: "medium",
          dueDate: "",
          team: "",
          assignees: [],
        });
        toast.success("New task created");
      } catch (error) {
        console.error("Failed to create task:", error);
        toast.error("Failed to create task");
      }
    } else {
      // Use local state if no projectId
      const newTask = {
        id: `task_${Date.now()}`,
        title: newTaskData.title,
        desc: newTaskData.desc,
        priority: newTaskData.priority,
        status: "To-Do",
        dueDate: newTaskData.dueDate,
        team: newTaskData.team,
        assignees: newTaskData.assignees,
      };

      setTasks((prev) => ({
        ...prev,
        [activeColumnId]: [...(prev[activeColumnId] || []), newTask],
      }));

      setAddTaskDialogOpen(false);
      toast.success("New task created");
    }
  };

  const handleSelectTemplate = (templateId) => {
    const template = templates.find((item) => item.id === templateId);
    if (!template) return;
    setColumns(template.columns);
    setSelectedTemplateId(templateId);
    setShowTemplateDialog(false);
  };

  const handleOpenTask = (task, columnId) => {
    // setActiveTask({ ...task, columnId });
    // setTaskDialogOpen(true);
    router.push(`/admin/projects/${projectId}/tasks/${task.id}`);
  };

  const toggleAssignee = (initials) => {
    if (!activeTask) return;

    setTasks((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((columnId) => {
        next[columnId] = next[columnId].map((task) =>
          task.id === activeTask.id
            ? {
                ...task,
                assignees: task.assignees.includes(initials)
                  ? task.assignees.filter((value) => value !== initials)
                  : [...task.assignees, initials],
              }
            : task,
        );
      });
      return next;
    });

    setActiveTask((prev) => {
      if (!prev) return prev;
      const has = prev.assignees.includes(initials);
      return {
        ...prev,
        assignees: has
          ? prev.assignees.filter((value) => value !== initials)
          : [...prev.assignees, initials],
      };
    });
  };

  const handleCommentInputChange = (taskId, value) => {
    setNewComments((prev) => ({
      ...prev,
      [taskId]: value,
    }));
  };

  const handleAddComment = async (taskId) => {
    const text = newComments[taskId]?.trim();
    if (!text) return;

    // If projectId is provided, use API
    if (projectId) {
      try {
        const commentData = {
          taskId: Number(taskId),
          author: "You", // TODO: Get from auth context
          content: text,
        };

        const result = await createTaskComment(commentData).unwrap();
        
        // Add to local state immediately for optimistic update
        const newComment = {
          id: String(result.id),
          author: result.author || "You",
          text: result.content || text,
          createdAt: result.createdAt,
        };

        setTaskComments((prev) => {
          const existing = prev[taskId] || [];
          return {
            ...prev,
            [taskId]: [...existing, newComment],
          };
        });

        // Refetch tasks to get latest comments
        if (refetchTasks) {
          await refetchTasks();
        }

        setNewComments((prev) => ({
          ...prev,
          [taskId]: "",
        }));
        
        toast.success("Comment added");
      } catch (error) {
        console.error("Failed to create comment:", error);
        toast.error("Failed to add comment");
      }
    } else {
      // Fallback to local state if no projectId
      setTaskComments((prev) => {
        const existing = prev[taskId] || [];
        const nextComment = {
          id: String(Date.now()),
          author: "You",
          text,
        };
        return {
          ...prev,
          [taskId]: [...existing, nextComment],
        };
      });

      setNewComments((prev) => ({
        ...prev,
        [taskId]: "",
      }));
    }
  };

  const getCommentCount = (taskId) => {
    return taskComments[taskId]?.length || 0;
  };

  const currentTemplate = templates.find(
    (template) => template.id === selectedTemplateId,
  );

  return (
    <>
      <div className="flex flex-col h-full gap-4">
        <div className="flex justify-end absolute top-0 right-0 md:static">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowTemplateDialog(true)}
            className={` bg-[#E0EF5F]  text-black px-6`}
          >
            <Layout className="w-5 h-5 md:w-4 md:h-4 md:mr-2" />
            <span className="inline">
              {currentTemplate ? "Change Template" : "Select Template"}
            </span>
          </Button>
        </div>

        <div className="pb-4 h-full flex items-start gap-4 overflow-x-auto snap-x snap-mandatory md:snap-none">
          {columns
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={tasks[column.id] || []}
                theme={theme}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDeleteColumn={handleDeleteColumn}
                onDragStart={handleDragStart}
                onOpenTask={handleOpenTask}
                expandedCommentTaskId={expandedCommentTaskId}
                setExpandedCommentTaskId={setExpandedCommentTaskId}
                getCommentCount={getCommentCount}
                taskComments={taskComments}
                newComments={newComments}
                handleCommentInputChange={handleCommentInputChange}
                handleAddComment={handleAddComment}
                onAddTask={handleAddTask}
              />
            ))}

          <button
            type="button"
            onClick={() => setShowColumnDialog(true)}
            className="w-[42vw] md:w-[32vw] mt-13  shrink-0 flex items-center gap-2 py-4 justify-center rounded-lg border-2 border-dashed border-[#EFFC76]/70 text-[#EFFC76] hover:bg-[#EFFC76]/10 transition-colors"
          >
            <div className="p-4 rounded-full bg-[#EFFC76]/10 group-hover:bg-[#EFFC76]/20 transition-colors">
              <Plus className="w-10 h-10 opacity-80" />
            </div>
            <span className="font-semibold text-lg">Add Custom Column</span>
          </button>
        </div>
      </div>

      <Dialog open={showColumnDialog} onOpenChange={setShowColumnDialog}>
        <DialogContent className="glass-card border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Add Custom Column</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Column name (e.g., Testing, Deployed)"
              value={newColumnName}
              onChange={(event) => setNewColumnName(event.target.value)}
              onKeyDown={(event) =>
                event.key === "Enter" ? handleAddColumn() : undefined
              }
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowColumnDialog(false)}
              className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddColumn}
              className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
            >
              Add Column
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="w-[calc(100vw-32px)] sm:w-full max-w-xl glass-card border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>{activeTask?.title}</DialogTitle>
          </DialogHeader>

          {activeTask && (
            <div className="space-y-6">
              {activeTask.desc && (
                <p className="text-sm text-white/70">{activeTask.desc}</p>
              )}

              <div className="flex items-center justify-between">
                <PriorityBadge priority={activeTask.priority} />
                <span className="text-xs text-white/60 uppercase">
                  {
                    columns.find((column) => column.id === activeTask.columnId)
                      ?.title
                  }
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-white/70 uppercase tracking-wide">
                  Assignees
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableMembers.map((member) => {
                    const selected = activeTask.assignees.includes(member.initials);
                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => toggleAssignee(member.initials)}
                        className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs border ${
                          selected
                            ? "bg-[#EFFC76]/20 border-[#EFFC76]/70 text-[#EFFC76]"
                            : "bg-white/5 border-white/20 text-white/70"
                        }`}
                        title={member.fullName}
                      >
                        <Avatar className="w-6 h-6 border border-white">
                          <AvatarFallback className="bg-[#EFFC76]/15 text-[#EFFC76] text-xs">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span>{member.initials}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={addTaskDialogOpen} onOpenChange={setAddTaskDialogOpen}>
        <DialogContent className="max-w-xl glass-card border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
               <label className="text-sm text-white/60 font-medium">Task Title</label>
               <Input
                placeholder="e.g., Redesign Login Page"
                value={newTaskData.title}
                onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
               />
            </div>
            
            <div className="space-y-2">
               <label className="text-sm text-white/60 font-medium">Description</label>
               <Textarea
                placeholder="Add task details..."
                value={newTaskData.desc}
                onChange={(e) => setNewTaskData({ ...newTaskData, desc: e.target.value })}
                className="resize-none min-h-[100px]"
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-sm text-white/60 font-medium flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Priority
                  </label>
                  <Select 
                    value={newTaskData.priority}
                    onValueChange={(value) => setNewTaskData({ ...newTaskData, priority: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
               </div>

               <div className="space-y-2">
                  <label className="text-sm text-white/60 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Due Date
                  </label>
                  <Input
                    type="date"
                    className="bg-white/5 border-white/10 [color-scheme:dark]"
                    value={newTaskData.dueDate}
                    onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })}
                  />
               </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-white/60 font-medium flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> Team
                </label>
                <Select 
                  value={newTaskData.team}
                  onValueChange={(value) => setNewTaskData({ ...newTaskData, team: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select Team" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                    {teamsList.map(team => (
                      <SelectItem key={team} value={team}>{team}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-white/60 font-medium flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Assignees
                </label>
                <div className="flex flex-wrap gap-2">
                    {availableMembers.map((initials) => {
                      const isSelected = newTaskData.assignees.includes(initials);
                      return (
                         <button
                           key={initials}
                           type="button"
                           onClick={() => {
                             if (isSelected) {
                               setNewTaskData({ 
                                 ...newTaskData, 
                                 assignees: newTaskData.assignees.filter(a => a !== initials) 
                               });
                             } else {
                               setNewTaskData({ 
                                 ...newTaskData, 
                                 assignees: [...newTaskData.assignees, initials] 
                               });
                             }
                           }}
                           className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${
                             isSelected ? "bg-[#EFFC76]/20 border-[#EFFC76] text-[#EFFC76]" : "bg-white/5 border-white/10 text-white/50"
                           }`}
                         >
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="text-[10px] bg-white/10">{initials}</AvatarFallback>
                            </Avatar>
                            {initials}
                         </button>
                      );
                    })}
                </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
             <Button 
               variant="outline" 
               onClick={() => {
                 setAddTaskDialogOpen(false);
                 setSelectedDepartmentId("");
               }} 
               className="border-white/10 hover:bg-white/5"
               disabled={isCreatingTask}
             >
               Cancel
             </Button>
             <Button 
               onClick={handleCreateTask} 
               className="bg-[#EFFC76] text-black hover:bg-[#dce865]"
               disabled={isCreatingTask}
             >
               {isCreatingTask ? "Creating..." : "Create Task"}
             </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="w-[calc(100vw-32px)] sm:w-full max-w-4xl glass-card border-white/20 text-white p-0 gap-0 shadow-2xl sm:rounded-xl overflow-hidden backdrop-blur-xl bg-black/80">
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-white tracking-tight">
                Choose a template
              </DialogTitle>
              <div className="text-sm text-white/60 mt-1">
                Select a workflow to get started. You can customize columns
                later.
              </div>
            </div>
          </div>

          <div className="px-6 py-4 overflow-y-auto max-h-[360px] bg-black/20">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => {
                let Icon = ListTodo;
                if (template.id === "scrum") Icon = Boxes;
                if (template.id === "kanban") Icon = Layout;
                if (template.id === "bug_tracking") Icon = MessageSquare;
                if (template.id === "devops") Icon = Code2;
                if (template.id === "marketing") Icon = Megaphone;
                if (template.id === "design") Icon = Palette;
                if (template.id === "hr") Icon = Users;
                if (template.id === "sales") Icon = DollarSign;
                if (template.id === "operations") Icon = Settings;
                if (template.id === "event_planning") Icon = Calendar;

                const isSelected = selectedTemplateId === template.id;

                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleSelectTemplate(template.id)}
                    className={`group relative flex flex-col items-start text-left p-3 md:p-5 rounded-lg border transition-all duration-200 outline-none ${
                      isSelected
                        ? `bg-white/5 ${theme.border} shadow-lg`
                        : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                          isSelected
                            ? `${theme.bg} text-black`
                            : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <div className={`${theme.text}`}>
                          <CheckCircle2 className="w-5 h-5 fill-current" />
                        </div>
                      )}
                    </div>

                    <h4
                      className={`text-sm font-semibold mb-1.5 ${
                        isSelected ? "text-white" : "text-white/90"
                      }`}
                    >
                      {template.name}
                    </h4>
                    <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="px-6 py-4 border-t border-white/10 flex justify-end bg-black/20">
            <Button
              variant="outline"
              onClick={() => setShowTemplateDialog(false)}
              className={`mr-2 bg-transparent ${theme.border} ${theme.text} hover:bg-white/5`}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
