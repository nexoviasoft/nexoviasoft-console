export const processTemplates = [
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
];

