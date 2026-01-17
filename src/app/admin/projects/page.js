"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import NewProjectDialog from "@/components/admin/projects/NewProjectDialog";

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

export default function Projects() {
  const router = useRouter();
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "In Progress": return "bg-blue-100 text-blue-700";
      case "Planning": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleProjectClick = (projectId) => {
    router.push(`/admin/projects/${projectId}`);
  };

  return (
    <div className="bg-gray-50 px-8 py-6 flex flex-col min-h-screen">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-500">
              Manage your projects with customizable Kanban boards
            </p>
          </div>
          <Button 
            onClick={() => setShowNewProjectDialog(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className="glass-card rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group"
            >
              {/* Project Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                    {project.name}
                  </h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                  <span>Progress</span>
                  <span className="text-purple-600">{project.progress}%</span>
                </div>
                <Progress 
                  value={project.progress} 
                  className="h-2 bg-gray-100" 
                  indicatorClassName="bg-purple-500"
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">
                    {project.tasksCompleted}/{project.totalTasks} tasks
                  </span>
                </div>
                
                <div className="flex -space-x-2">
                  {project.team.slice(0, 3).map((member, idx) => (
                    <Avatar key={idx} className="h-7 w-7 border-2 border-white ring-1 ring-gray-50">
                      <AvatarFallback className={`text-[10px] ${idx % 2 === 0 ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {project.team.length > 3 && (
                    <div className="h-7 w-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                      <span className="text-[10px] font-medium text-gray-600">
                        +{project.team.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewProjectDialog 
        open={showNewProjectDialog} 
        onOpenChange={setShowNewProjectDialog} 
      />
    </div>
  );
}
