"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern UI/UX",
    status: "In Progress",
    progress: 65,
    team: [
      { name: "Sarah J", avatar: "SJ" },
      { name: "Mike C", avatar: "MC" },
      { name: "Emily R", avatar: "ER" }
    ],
    dueDate: "2026-02-15",
    tasksCompleted: 13,
    totalTasks: 20
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Native iOS and Android app for customer portal",
    status: "In Progress",
    progress: 40,
    team: [
      { name: "David K", avatar: "DK" },
      { name: "Lisa A", avatar: "LA" }
    ],
    dueDate: "2026-03-01",
    tasksCompleted: 8,
    totalTasks: 20
  },
  {
    id: 3,
    name: "API Integration",
    description: "Integrate third-party payment and analytics APIs",
    status: "Planning",
    progress: 15,
    team: [
      { name: "John D", avatar: "JD" },
      { name: "Anna M", avatar: "AM" }
    ],
    dueDate: "2026-02-28",
    tasksCompleted: 3,
    totalTasks: 20
  },
  {
    id: 4,
    name: "Database Migration",
    description: "Migrate from PostgreSQL to MongoDB for better scalability",
    status: "Completed",
    progress: 100,
    team: [
      { name: "Tom W", avatar: "TW" }
    ],
    dueDate: "2026-01-10",
    tasksCompleted: 15,
    totalTasks: 15
  }
];

export default function ProjectList({ onSelectProject, selectedProjectId }) {
  const router = useRouter();

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "In Progress": return "bg-blue-100 text-blue-700";
      case "Planning": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleClick = (project) => {
    if (onSelectProject) {
      onSelectProject(project);
    } else {
      router.push(`/admin/projects/${project.id}`);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">All Projects</h2>
          <p className="text-sm text-gray-500">Select a project to view details</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={() => handleClick(project)}
            className={`
              group relative p-5 rounded-xl border transition-all duration-200 cursor-pointer
              ${selectedProjectId === project.id 
                ? 'bg-white border-purple-200 shadow-md ring-1 ring-purple-100' 
                : 'bg-white border-gray-100 hover:border-purple-200 hover:shadow-sm'
              }
            `}
          >
            {/* Left Border Indicator for Selected State */}
            {selectedProjectId === project.id && (
              <div className="absolute left-0 top-4 bottom-4 w-1 bg-purple-500 rounded-r-full" />
            )}

            <div className="mb-3 pl-2">
              <h3 className={`font-bold text-lg mb-1 ${selectedProjectId === project.id ? 'text-gray-900' : 'text-gray-800'}`}>
                {project.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-4 pl-2">
              <div>
                <div className="flex justify-between text-xs font-medium text-gray-500 mb-1.5">
                  <span>Progress</span>
                  <span className={selectedProjectId === project.id ? 'text-purple-600' : 'text-gray-600'}>
                    {project.progress}%
                  </span>
                </div>
                <Progress 
                  value={project.progress} 
                  className="h-1.5 bg-gray-100" 
                  indicatorClassName={selectedProjectId === project.id ? 'bg-purple-500' : 'bg-gray-400 group-hover:bg-purple-400'}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{project.tasksCompleted}/{project.totalTasks} tasks</span>
                </div>
                
                <div className="flex -space-x-2">
                  {project.team.map((member, idx) => (
                    <Avatar key={idx} className="h-7 w-7 border-2 border-white ring-1 ring-gray-50">
                      <AvatarFallback className={`text-[10px] ${idx % 2 === 0 ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
