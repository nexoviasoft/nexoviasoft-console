"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EnhancedKanbanBoard from "@/components/admin/projects/EnhancedKanbanBoard";
import ProjectComments from "@/components/admin/projects/ProjectComments";
import { useGetProjectByIdQuery } from "@/api/admin/projects/projectsApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
  
export default function ProjectDetailPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const { data: projectResponse, isLoading, error } = useGetProjectByIdQuery(Number(id));
  
  // Simple extraction
  const project = Array.isArray(projectResponse) 
    ? projectResponse[0] 
    : (projectResponse?.data || projectResponse);

  // Ensure we extract primitives only - validate and convert
  // All hooks must be called before any conditional returns
  const projectId = React.useMemo(() => {
    if (!project?.id) return null;
    const id = project.id;
    if (typeof id === 'number') return id;
    if (typeof id === 'string') {
      const num = parseInt(id, 10);
      return isNaN(num) ? null : num;
    }
    // If it's an object, don't use it
    if (typeof id === 'object') {
      console.error('Project ID is an object!', id);
      return null;
    }
    return null;
  }, [project?.id]);
  
  const applicationType = React.useMemo(() => {
    if (!project?.applicationType) return '';
    const appType = project.applicationType;
    if (typeof appType === 'string') return appType;
    // If it's an object, don't use it
    if (typeof appType === 'object') {
      console.error('Application type is an object!', appType);
      return '';
    }
    return String(appType || '');
  }, [project?.applicationType]);
  
  const projectName = React.useMemo(() => {
    if (!project?.name) return 'Project';
    const name = project.name;
    if (typeof name === 'string') return name;
    // If it's an object, don't use it
    if (typeof name === 'object') {
      console.error('Project name is an object!', name);
      return 'Project';
    }
    return String(name || 'Project');
  }, [project?.name]);

  if (isLoading) {
    return (
      <div className="px-4 py-4 md:px-8 md:py-6 flex items-center justify-center min-h-screen text-white">
        <div className="text-white/60">Loading project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="px-4 py-4 md:px-8 md:py-6 flex items-center justify-center min-h-screen text-white">
        <div className="text-red-400">Failed to load project</div>
      </div>
    );
  }

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
    text-white/70 hover:text-[#F58220]
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
              <ArrowLeft className="w-5 h-5 md:w-4 md:h-4 md:mr-2 text-[#F58220]" />
              <span className="hidden md:inline">Back to Projects</span>
            </Button>

            <div className="hidden md:block h-6 w-px bg-white/20" />
            <div>
              <h1 className=" text-md md:text-2xl font-bold text-white">
                {projectName}
              </h1>
              {/* <p className="text-sm text-white/60">{project?.description}</p> */}
            </div>
          </div>
        </div>

        {/* glass-card rounded-xl p-4 md:p-6 flex-1 min-h-[600px] overflow-hidden */}
        <div className="">
          {projectId && projectId > 0 && typeof applicationType === 'string' && (
            <EnhancedKanbanBoard 
              applicationType={applicationType} 
              projectId={projectId} 
            />
          )}
        </div>

        {/* Comments Section */}
        {/* glass-card rounded-xl p-4 md:p-6 */}
        <div className="">
          {projectId && projectId > 0 && (
            <ProjectComments projectId={projectId} />
          )}
        </div>
      </div>
    </div>
  );
}
