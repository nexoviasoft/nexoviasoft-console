"use client";

import React, { useState } from "react";
import ProjectList from "@/components/admin/projects/ProjectList";
import EnhancedKanbanBoard from "@/components/admin/projects/EnhancedKanbanBoard";
import ProjectComments from "@/components/admin/projects/ProjectComments";
import { FileText } from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="bg-gray-50 px-8 py-6 flex flex-col min-h-screen">
      <div className="max-w-[1920px] w-full mx-auto flex flex-col gap-6 h-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500">
            Manage your projects with customizable Kanban boards and team collaboration
          </p>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          {/* Project List Sidebar */}
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <div className="glass-card rounded-xl p-6 h-full">
              <ProjectList 
                onSelectProject={setSelectedProject} 
                selectedProjectId={selectedProject?.id}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col gap-6 min-h-0">
            {selectedProject ? (
              <>
                {/* Kanban Board */}
                <div className="glass-card rounded-xl p-6 flex-1 min-h-[500px] overflow-hidden">
                  <EnhancedKanbanBoard />
                </div>

                {/* Comments Section */}
                <div className="glass-card rounded-xl p-6">
                  <ProjectComments projectId={selectedProject.id} />
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center glass-card rounded-xl border-2 border-dashed border-gray-200">
                <div className="text-center px-6 py-12">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Project Selected
                  </h3>
                  <p className="text-sm text-gray-500 max-w-md">
                    Select a project from the list to view its Kanban board, manage tasks, 
                    and collaborate with your team using comments and @mentions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
