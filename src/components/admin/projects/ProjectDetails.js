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
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Button>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <Badge className={
            project.status === "Completed" ? "bg-green-100 text-green-700" :
            project.status === "In Progress" ? "bg-blue-100 text-blue-700" :
            "bg-yellow-100 text-yellow-700"
          }>
            {project.status}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-4 border-t">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Team Members</p>
              <div className="flex -space-x-2 mt-1">
                {project.team.map((member, idx) => (
                  <Avatar key={idx} className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Due Date</p>
              <p className="font-medium">{project.dueDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Progress</p>
              <p className="font-medium">{project.progress}% Complete</p>
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
          <ProjectComments projectId={project.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
