"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, Calendar, Target } from "lucide-react";
import EnhancedKanbanBoard from "./EnhancedKanbanBoard";
import TimelineView from "./TimelineView";
import ProjectComments from "./ProjectComments";

export default function ProjectDetails({ project, onBack }) {
  return (
    <div className="space-y-6 text-white">
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2 text-white/70 hover:text-[#EFFC76] hover:bg-white/5"
      >
        <ArrowLeft className="w-4 h-4 mr-1 text-[#EFFC76]" />
        Back to Projects
      </Button>

      <div className="glass-card rounded-xl p-4 md:p-6 border-white/20">
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
              {project.name}
            </h1>
            <p className="text-sm md:text-base text-white/70 line-clamp-1 md:line-clamp-none">{project.description}</p>
          </div>
          <Badge
            className={
              project.status === "Completed"
                ? "bg-emerald-500/15 text-emerald-200 border border-emerald-400/60"
                : project.status === "In Progress"
                ? "bg-sky-500/15 text-sky-200 border border-sky-400/60"
                : "bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/60"
            }
          >
            {project.status}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-6 pt-3 md:pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#EFFC76]/15 rounded-lg border border-[#EFFC76]/40">
              <Users className="w-5 h-5 text-[#EFFC76]" />
            </div>
            <div>
              <p className="text-xs text-white/60">Team Members</p>
              <div className="flex -space-x-2 mt-1">
                {project.team.map((member, idx) => (
                  <Avatar
                    key={idx}
                    className="h-6 w-6 border-2 border-black/60 ring-1 ring-[#EFFC76]/40"
                  >
                    <AvatarFallback className="bg-[#EFFC76]/15 text-[#EFFC76] text-xs">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg border border-white/20">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-white/60">Due Date</p>
              <p className="font-medium text-white">{project.dueDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg border border-white/20">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-white/60">Progress</p>
              <p className="font-medium text-[#EFFC76]">
                {project.progress}% Complete
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="board" className="w-full">
        <TabsList>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="board" className="mt-6">
          <EnhancedKanbanBoard />
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-6">
          <TimelineView />
        </TabsContent>
        
        <TabsContent value="comments" className="mt-6">
          <ProjectComments projectId={project.id} applicationType={project.applicationType} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
