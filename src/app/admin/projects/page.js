"use client";

import React, { useState } from "react";
import ProjectHeader from "@/components/admin/projects/ProjectHeader";
import ProjectList from "@/components/admin/projects/ProjectList";
import EnhancedKanbanBoard from "@/components/admin/projects/EnhancedKanbanBoard";
import TimelineView from "@/components/admin/projects/TimelineView";
import ProjectComments from "@/components/admin/projects/ProjectComments";

export default function Projects() {
  const [currentView, setCurrentView] = useState("board");
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="bg-gray-50 px-8 py-6 flex flex-col">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full">
        <ProjectHeader
          currentView={currentView}
          onViewChange={(value) => setCurrentView(value)}
        />

        <div className="flex-1 min-h-0 mt-6 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <ProjectList onSelectProject={setSelectedProject} />
          </div>

          <div className="flex-1 flex flex-col gap-6">
            {selectedProject ? (
              <>
                <div className="flex-1 min-h-[320px]">
                  {currentView === "board" ? (
                    <EnhancedKanbanBoard />
                  ) : (
                    <TimelineView />
                  )}
                </div>
                <div className="border rounded-lg bg-white p-4">
                  <ProjectComments projectId={selectedProject.id} />
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center border border-dashed border-gray-200 rounded-lg bg-white">
                <p className="text-gray-500 text-sm text-center px-4">
                  Select a project from the list to view its kanban board, timeline and add comments with @mentions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
