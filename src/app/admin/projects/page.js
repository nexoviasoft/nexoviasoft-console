"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Code, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import NewProjectDialog from "@/components/admin/projects/NewProjectDialog";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern UI/UX",
    status: "In Progress",
    progress: 65,
    applicationType: "Web Application",
    platform: "Marketing Site",
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
    applicationType: "Mobile Application",
    platform: "iOS & Android",
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
    applicationType: "Backend Service",
    platform: "REST API",
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
    applicationType: "Database Layer",
    platform: "MongoDB Cluster",
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
      case "Completed":
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50";
      case "In Progress":
        return "bg-sky-500/20 text-sky-200 border border-sky-400/60";
      case "Planning":
        return "bg-indigo-500/20 text-indigo-200 border border-indigo-400/60";
      default:
        return "bg-white/10 text-white/70 border border-white/20";
    }
  };

  const handleProjectClick = (projectId) => {
    router.push(`/admin/projects/${projectId}`);
  };

  return (
    <div className="px-8 py-6 flex flex-col min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <p className="text-sm text-white/60">
              Manage your product, mobile and backend applications in one place
            </p>
          </div>
          <Button 
            onClick={() => setShowNewProjectDialog(true)}
            className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white glass-button"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Application Project
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
                  <h3 className="font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                    {project.name}
                  </h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                {project.applicationType && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-sky-500/10 border border-sky-400/40 text-sky-100">
                      <Code className="w-3.5 h-3.5" />
                      <span className="font-medium">{project.applicationType}</span>
                    </span>
                    {project.platform && (
                      <span className="px-2 py-1 rounded-full bg-white/5 border border-white/15">
                        {project.platform}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-medium text-white/60 mb-2">
                  <span>Progress</span>
                  <span className="text-sky-300">{project.progress}%</span>
                </div>
                <Progress 
                  value={project.progress} 
                  className="h-2 bg-white/10" 
                  indicatorClassName="bg-sky-500"
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-white/80 bg-sky-500/10 px-2 py-1 rounded-md border border-sky-400/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" />
                  <span className="text-xs font-medium">
                    {project.tasksCompleted}/{project.totalTasks} tasks
                  </span>
                </div>
                
                <div className="flex -space-x-2">
                  {project.team.slice(0, 3).map((member, idx) => (
                    <Avatar
                      key={idx}
                      className="h-7 w-7 border-2 border-black/60 ring-1 ring-sky-400/40"
                    >
                      <AvatarFallback className="text-[10px] bg-sky-500/10 text-sky-200">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {project.team.length > 3 && (
                    <div className="h-7 w-7 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                      <span className="text-[10px] font-medium text-white/80">
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
