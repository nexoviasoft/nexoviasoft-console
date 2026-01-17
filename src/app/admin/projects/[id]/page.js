"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EnhancedKanbanBoard from "@/components/admin/projects/EnhancedKanbanBoard";
import ProjectComments from "@/components/admin/projects/ProjectComments";

// Mock project data - in real app, fetch based on params.id
const getProject = (id) => {
  const projects = {
    "1": { id: 1, name: "Website Redesign", description: "Complete overhaul of company website" },
    "2": { id: 2, name: "Mobile App Development", description: "Native iOS and Android app" },
    "3": { id: 3, name: "API Integration", description: "Third-party integrations" },
    "4": { id: 4, name: "Database Migration", description: "PostgreSQL to MongoDB migration" }
  };
  return projects[id] || projects["1"];
};

export default function ProjectDetailPage({ params }) {
  const router = useRouter();
  const project = getProject(params.id);

  return (
    <div className="bg-gray-50 px-8 py-6 flex flex-col min-h-screen">
      <div className="max-w-[1920px] w-full mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/admin/projects')}
              className="hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-sm text-gray-500">{project.description}</p>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="glass-card rounded-xl p-6 flex-1 min-h-[600px]">
          <EnhancedKanbanBoard />
        </div>

        {/* Comments Section */}
        <div className="glass-card rounded-xl p-6">
          <ProjectComments projectId={project.id} />
        </div>
      </div>
    </div>
  );
}
