"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Code,
  Plus,
  FolderKanban,
  Globe,
  Smartphone,
  Server,
  Database,
  Layout,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import NewProjectDialog from "@/components/admin/projects/NewProjectDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  useGetProjectsQuery,
  useDeleteProjectMutation 
} from "@/api/admin/projects/projectsApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Projects() {
  const router = useRouter();
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  
  const { data: projectsResponse, isLoading, error, refetch } = useGetProjectsQuery();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  
  // Extract projects from API response
  const projects = Array.isArray(projectsResponse) 
    ? projectsResponse 
    : (projectsResponse?.data || []);

  // Format team members for display
  const formatTeamMembers = (teamMembers) => {
    if (!teamMembers || !Array.isArray(teamMembers)) return [];
    return teamMembers.map((member) => {
      const initials = (member.firstName?.[0] || '') + (member.lastName?.[0] || '') || 'TM';
      return {
        name: `${member.firstName || ''} ${member.lastName || ''}`.trim() || 'Team Member',
        avatar: initials,
      };
    });
  };

  const handleProjectClick = (projectId) => {
    router.push(`/admin/projects/${projectId}`);
  };

  const handleDeleteClick = (e, project) => {
    e.stopPropagation();
    setProjectToDelete(project);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject(projectToDelete.id).unwrap();
      toast.success("Project deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete project");
    } finally {
      setProjectToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 py-4 md:px-8 md:py-6 flex items-center justify-center min-h-screen text-white">
        <div className="text-white/60">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4 md:px-8 md:py-6 flex items-center justify-center min-h-screen text-white">
        <div className="text-red-400">Failed to load projects</div>
      </div>
    );
  }

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

  const getAppTypeColor = (type) => {
    switch (type) {
      case "Web Application":
        return "bg-purple-500/15 text-purple-300 border border-purple-400/50";
      case "Mobile Application":
        return "bg-orange-500/15 text-orange-300 border border-orange-400/50";
      case "Backend Service":
        return "bg-blue-500/15 text-blue-300 border border-blue-400/50";
      case "Database Layer":
        return "bg-emerald-500/15 text-emerald-300 border border-emerald-400/50";
      default:
        return "bg-[#F58220]/15 text-[#F58220] border border-[#F58220]/50";
    }
  };

  const getAppTypeIcon = (type) => {
    switch (type) {
      case "Web Application":
        return <Globe className="w-3.5 h-3.5" />;
      case "Mobile Application":
        return <Smartphone className="w-3.5 h-3.5" />;
      case "Backend Service":
        return <Server className="w-3.5 h-3.5" />;
      case "Database Layer":
        return <Database className="w-3.5 h-3.5" />;
      default:
        return <Code className="w-3.5 h-3.5" />;
    }
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 md:px-8 md:py-6 flex flex-col min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FolderKanban className="w-6 h-6 text-[#F58220]" />
              Projects
            </h1>
            <p className="text-sm text-white/60 mt-1">
              Manage your product, mobile and backend applications in one place
            </p>
          </div>
          <Button
            onClick={() => setShowNewProjectDialog(true)}
            className="bg-[#F58220] hover:bg-[#d91d79] text-black glass-button w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Application Project
          </Button>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 mb-4">No projects yet</p>
            <Button 
              onClick={() => setShowNewProjectDialog(true)}
              className="bg-[#F58220] hover:bg-[#d91d79] text-black"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {projects.map((project) => {
              const teamMembers = formatTeamMembers(project.team || project.teamMembers || []);
              return (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className="glass-card rounded-xl p-4 md:p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group relative"
                >
                  {/* Delete Button (Admin Only) */}
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDeleteClick(e, project)}
                      className="absolute top-2 right-2 h-7 w-7 text-white/20 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  {/* Project Header */}
                  <div className="mb-3 md:mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-base md:text-lg text-white group-hover:text-[#F58220] transition-colors line-clamp-1 pr-6">
                        {project.name}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${getStatusColor(project.status)}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">
                      {project.description || 'No description'}
                    </p>
                    {project.applicationType && (
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/70">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${getAppTypeColor(
                            project.applicationType,
                          )}`}
                        >
                          {getAppTypeIcon(project.applicationType)}
                          <span className="font-medium">
                            {project.applicationType}
                          </span>
                        </span>
                        {project.platform && (
                          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/20 text-white/80 flex items-center gap-1.5">
                            <Layout className="w-3.5 h-3.5" />
                            {project.platform}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Progress */}
                  <div className="mb-3 md:mb-4">
                    <div className="flex justify-between text-xs font-medium text-white/60 mb-2">
                      <span>Progress</span>
                      <span className="text-[#F58220]">{project.progress || 0}%</span>
                    </div>
                    <Progress
                      value={project.progress || 0}
                      className="h-1.5 md:h-2 bg-white/10"
                      indicatorClassName="bg-[#F58220]"
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-white/80 bg-[#F58220]/15 px-2 py-1 rounded-md border border-[#F58220]/50">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F58220]" />
                      <span className="text-xs font-medium">
                        {project.tasksCompleted || 0}/{project.totalTasks || 0} tasks
                      </span>
                    </div>

                    <div className="flex -space-x-2">
                      {teamMembers.slice(0, 3).map((member, idx) => (
                        <Avatar
                          key={idx}
                          className="h-7 w-7 border-2 border-black/60 ring-1 ring-[#F58220]/40"
                        >
                          <AvatarFallback className="text-[10px] bg-[#F58220]/15 text-[#F58220]">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {teamMembers.length > 3 && (
                        <div className="h-7 w-7 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                          <span className="text-[10px] font-medium text-white/80">
                            +{teamMembers.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <NewProjectDialog
        open={showNewProjectDialog}
        onOpenChange={setShowNewProjectDialog}
        onProjectCreated={() => {
          setShowNewProjectDialog(false);
          refetch();
        }}
      />

      {/* Delete Confirmation Modal */}
      <AlertDialog
        open={!!projectToDelete}
        onOpenChange={(open) => !open && setProjectToDelete(null)}
      >
        <AlertDialogContent className="bg-[#1A1A1A] border-white/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Project: <span className="text-white font-medium">{projectToDelete?.name}</span>
              <br />
              This action cannot be undone. This will permanently delete the project and all related tasks and data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteProject}
              className="bg-red-600 hover:bg-red-700 text-white border-none"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
