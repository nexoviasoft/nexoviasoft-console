"use client";

import React from "react";
import ProjectList from "@/components/admin/projects/ProjectList";

export default function Projects() {
  return (
    <div className="bg-gray-50 px-8 py-6 flex flex-col min-h-screen">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-500">
              Select a project from the list to open its Jira-style board.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <ProjectList />
        </div>
      </div>
    </div>
  );
}
