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
    1: {
      id: 1,
      name: "Website Redesign",
      description: "Complete overhaul of company website with modern UI/UX",
      applicationType: "Web Application",
    },
    2: {
      id: 2,
      name: "Mobile App Development",
      description: "Native iOS and Android app for customer portal",
      applicationType: "Mobile Application",
    },
    3: {
      id: 3,
      name: "API Integration",
      description: "Integrate third-party payment and analytics APIs",
      applicationType: "Backend Service",
    },
    4: {
      id: 4,
      name: "Database Migration",
      description: "Migrate from PostgreSQL to MongoDB for better scalability",
      applicationType: "Database Layer",
    },
  };
  return projects[id] || projects["1"];
};

export default function ProjectDetailPage({ params }) {
  const router = useRouter();
  const project = getProject(params.id);

  return (
    <div className="px-4 py-4 md:px-8 md:py-6 flex flex-col min-h-screen text-white">
      <div className="max-w-[1920px] w-full mx-auto flex flex-col gap-6 relative">
        {/* Header */}
        <div className="flex mmb-5 md:mb-0 flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/admin/projects")}
              className="
    text-white/70 hover:text-[#EFFC76]
    hover:bg-white/5
    w-fit
    px-2 md:px-3

    /* mobile arrow button style */
    rounded-full
    border border-white/10
    bg-white/5
    backdrop-blur
    shadow-sm
    md:rounded-md
    md:border-transparent
    md:bg-transparent
    md:shadow-none
  "
            >
              <ArrowLeft className="w-5 h-5 md:w-4 md:h-4 md:mr-2 text-[#EFFC76]" />
              <span className="hidden md:inline">Back to Projects</span>
            </Button>

            <div className="hidden md:block h-6 w-px bg-white/20" />
            <div>
              <h1 className=" text-md md:text-2xl font-bold text-white">
                {project.name}
              </h1>
              {/* <p className="text-sm text-white/60">{project.description}</p> */}
            </div>
          </div>
        </div>

        {/* glass-card rounded-xl p-4 md:p-6 flex-1 min-h-[600px] overflow-hidden */}
        <div className="">
          <EnhancedKanbanBoard applicationType={project.applicationType} />
        </div>

        {/* Comments Section */}
        {/* glass-card rounded-xl p-4 md:p-6 */}
        <div className="">
          <ProjectComments projectId={project.id} />
        </div>
      </div>
    </div>
  );
}
