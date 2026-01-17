"use client";

import React, { useState } from "react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, MessageSquare, Plus, X } from "lucide-react";
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

const initialTasks = {
  todo: [
    {
      id: "1",
      title: "Design Homepage Mockup",
      desc: "Create initial design concepts",
      priority: "high",
      assignees: ["SJ", "MC"],
    },
    {
      id: "2",
      title: "Setup Development Environment",
      desc: "Configure local dev environment",
      priority: "medium",
      assignees: ["DK"],
    },
  ],
  inprogress: [
    {
      id: "3",
      title: "Implement Authentication",
      desc: "Add login and signup flows",
      priority: "high",
      assignees: ["ER", "LA"],
    },
  ],
  review: [
    {
      id: "5",
      title: "QA Review for Onboarding",
      desc: "Verify flows before release",
      priority: "medium",
      assignees: ["SJ"],
    },
  ],
  complete: [
    {
      id: "4",
      title: "Project Kickoff Meeting",
      desc: "Initial team alignment",
      priority: "low",
      assignees: ["SJ"],
    },
  ],
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    high: "bg-red-500/15 text-red-200 border border-red-400/50",
    medium: "bg-yellow-400/15 text-yellow-100 border border-yellow-300/60",
    low: "bg-emerald-500/15 text-emerald-200 border border-emerald-400/50",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold tracking-wide ${
        styles[priority] || styles.low
      }`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

export default function EnhancedKanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const [showColumnDialog, setShowColumnDialog] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [taskComments, setTaskComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [selectedTemplateId, setSelectedTemplateId] =
    useState("project_management");
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  const availableMembers = ["SJ", "MC", "ER", "DK", "LA", "JD", "AM", "TW"];

  const handleAddColumn = () => {
    if (!newColumnName.trim()) return;

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
  };

  const handleDeleteColumn = (columnId) => {
    if (tasks[columnId]?.length > 0) {
      toast.error("Cannot delete column with tasks");
      return;
    }
    setColumns(columns.filter((column) => column.id !== columnId));
    const nextTasks = { ...tasks };
    delete nextTasks[columnId];
    setTasks(nextTasks);
    toast.success("Column deleted");
  };

  const handleDragStart = (event, task, sourceColumn) => {
    setDraggedTask({ task, sourceColumn });
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event, targetColumn) => {
    event.preventDefault();
    if (!draggedTask) return;

    const { task, sourceColumn } = draggedTask;

    if (sourceColumn === targetColumn) {
      setDraggedTask(null);
      return;
    }

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
    if (columnTitle) {
      toast.success(`Task moved to ${columnTitle}`);
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
    setActiveTask({ ...task, columnId });
    setTaskDialogOpen(true);
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

  const handleAddComment = (taskId) => {
    const text = newComments[taskId]?.trim();
    if (!text) return;

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
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-[0.2em]">
              Template
            </p>
            <p className="text-sm font-semibold text-[#EFFC76]">
              {currentTemplate ? currentTemplate.name : "Select a template"}
            </p>
            <p className="text-xs text-white/60 max-w-xl">
              {currentTemplate
                ? currentTemplate.description
                : "Choose the project template that best matches your workflow."}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowTemplateDialog(true)}
            className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-[#EFFC76]/60"
          >
            {currentTemplate ? "Change Template" : "Select Template"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-4 h-full items-start">
          {columns
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((column) => (
              <div
                key={column.id}
                className="w-full flex flex-col gap-4 rounded-2xl bg-white/5 border border-white/10 p-3 "
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, column.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-white/80 uppercase tracking-wide">
                      {column.title}
                    </span>
                    <span className="bg-white/10 text-[#EFFC76] text-xs font-semibold px-2 py-0.5 rounded-full border border-white/20">
                      {tasks[column.id]?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {column.isCustom && (
                      <button
                        type="button"
                        onClick={() => handleDeleteColumn(column.id)}
                        className="text-white/60 hover:text-red-400 p-1 hover:bg-red-500/10 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      className="text-white/50 hover:text-[#EFFC76] p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {(tasks[column.id] || []).map((task) => (
                  <Card
                    key={task.id}
                    className="cursor-move bg-black/40 hover:bg-black/60 hover:shadow-[0_0_28px_rgba(239,252,118,0.35)] border border-white/10 hover:border-[#EFFC76]/70 transition-all duration-200"
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(event, task, column.id)
                    }
                    onClick={() => handleOpenTask(task, column.id)}
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-white leading-tight">
                          {task.title}
                        </h4>
                      </div>

                      {task.desc && (
                        <p className="text-xs text-white/70 line-clamp-2">
                          {task.desc}
                        </p>
                      )}

                      <PriorityBadge priority={task.priority} />

                      <div className="pt-2 flex items-center justify-between border-t border-white/10 mt-2">
                        <div className="flex -space-x-2">
                          {task.assignees.map((initials, index) => (
                            <Avatar
                              key={initials + index}
                              className="w-6 h-6 border-2 border-white/80"
                            >
                              <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76] text-xs">
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="flex items-center gap-1 text-white/50 hover:text-[#EFFC76] text-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{getCommentCount(task.id)}</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <button
                  type="button"
                  className="flex items-center gap-2 text-white/60 hover:text-[#EFFC76] py-2 w-full justify-center border border-dashed border-white/30 rounded-lg bg-white/5 hover:border-[#EFFC76]/70 hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Task</span>
                </button>
              </div>
            ))}

          <button
            type="button"
            onClick={() => setShowColumnDialog(true)}
            className="w-full flex items-center gap-2 text-white/60 hover:text-[#EFFC76] py-4 justify-center border-2 border-dashed border-white/30 rounded-2xl bg-white/5 hover:border-[#EFFC76]/70 hover:bg-white/10 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Custom Column</span>
          </button>
        </div>
      </div>

      <Dialog open={showColumnDialog} onOpenChange={setShowColumnDialog}>
        <DialogContent className="max-w-md glass-card border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Add Custom Column</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Column name (e.g., Testing, Deployed)"
              value={newColumnName}
              onChange={(event) => setNewColumnName(event.target.value)}
              onKeyDown={(event) =>
                event.key === "Enter" ? handleAddColumn() : undefined
              }
              className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowColumnDialog(false)}
              className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10"
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
        <DialogContent className="max-w-xl glass-card border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">
              {activeTask?.title}
            </DialogTitle>
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
                  {availableMembers.map((initials) => {
                    const selected = activeTask.assignees.includes(initials);
                    return (
                      <button
                        key={initials}
                        type="button"
                        onClick={() => toggleAssignee(initials)}
                        className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs border transition-colors ${
                          selected
                            ? "bg-[#EFFC76]/20 border-[#EFFC76]/60 text-[#EFFC76]"
                            : "bg-white/5 border-white/20 text-white/70 hover:border-[#EFFC76]/40 hover:text-[#EFFC76]"
                        }`}
                      >
                        <Avatar className="w-6 h-6 border border-white">
                          <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76] text-xs">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <span>{initials}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="max-w-3xl glass-card border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">
              Select a project template
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => handleSelectTemplate(template.id)}
                className={`flex flex-col items-start text-left p-4 rounded-lg border transition-colors bg-white/5 ${
                  selectedTemplateId === template.id
                    ? "border-[#EFFC76]/70 bg-[#EFFC76]/10"
                    : "border-white/10 hover:border-[#EFFC76]/60 hover:bg-white/10"
                }`}
              >
                <span className="text-sm font-semibold text-white">
                  {template.name}
                </span>
                <span className="mt-1 text-xs text-white/70">
                  {template.description}
                </span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
