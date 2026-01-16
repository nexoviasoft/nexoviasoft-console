"use client";

import React, { useState } from "react";
import ProjectHeader from "@/components/admin/projects/ProjectHeader";
import KanbanBoard from "@/components/admin/projects/KanbanBoard";
import TimelineView from "@/components/admin/projects/TimelineView";

export default function Projects() {
  const [currentView, setCurrentView] = useState("board"); // "board" or "timeline"

  return (
    <div className="bg-gray-50 px-8 py-6 flex flex-col">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full">
        
        <ProjectHeader 
          currentView={currentView} 
          onViewChange={(value) => setCurrentView(value)} 
        />

        <div className="flex-1 min-h-0">
          {currentView === "board" ? (
            <KanbanBoard />
          ) : (
            <TimelineView />
          )}
        </div>

      </div>
    </div>
  );
}
