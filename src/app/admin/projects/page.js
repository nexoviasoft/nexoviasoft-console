"use client";

import React, { useState } from "react";
import ProjectHeader from "@/components/admin/projects/ProjectHeader";
import ProjectList from "@/components/admin/projects/ProjectList";
import ProjectDetails from "@/components/admin/projects/ProjectDetails";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="bg-gray-50 px-8 py-6 flex flex-col">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full">
        <ProjectHeader
          currentView="board"
          onViewChange={() => {}}
        />

        <div className="flex-1 min-h-0 mt-6 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <ProjectList onSelectProject={setSelectedProject} />
          </div>

          <div className="flex-1">
            {selectedProject ? (
              <ProjectDetails
                project={selectedProject}
                onBack={() => setSelectedProject(null)}
              />
            ) : (
              <div className="h-full flex items-center justify-center border border-dashed border-gray-200 rounded-lg bg-white">
                <p className="text-gray-500 text-sm">
                  Select a project from the list to view its board, timeline and comments.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
