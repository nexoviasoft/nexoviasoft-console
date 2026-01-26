"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Lock, Share2, Filter, LayoutGrid, Plus, Users } from "lucide-react";
import NewProjectDialog from "./NewProjectDialog";
import InviteMembersDialog from "./InviteMembersDialog";

export default function ProjectHeader({ currentView, onViewChange, selectedProject }) {
  const [isNewProjectOpen, setIsNewProjectOpen] = React.useState(false);
  const [isInviteOpen, setIsInviteOpen] = React.useState(false);

  return (
    <div className="space-y-6 mb-8">
      {/* Dashboard Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">An overview of key HR metrics and quick insights on employee activity.</p>
        </div>
        
        {/* Date Range & Actions */}
        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border rounded-md text-sm text-gray-600 shadow-sm">
              <span>&lt;</span>
              <span>January 1 - January 7, 2025</span>
              <span>&gt;</span>
           </div>
        </div>
      </div>

      {/* Meta Info & Actions Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pt-4 border-t border-gray-200 min-h-[60px]">
        {selectedProject ? (
          <>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Private Board</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </div>
              <div className="flex items-center gap-2 hidden sm:flex">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Last update 10 May 2022</span>
              </div>
              
              <div className="h-4 w-px bg-gray-300 mx-2 hidden sm:block"></div>
              
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">Members :</span>
                <div className="flex -space-x-2">
                  {selectedProject.team?.map((member, idx) => (
                    <Avatar key={idx} className="w-8 h-8 border-2 border-white cursor-pointer hover:scale-105 transition-transform">
                      <AvatarFallback className={`text-xs ${idx % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-200">
                    +2
                  </div>
                </div>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full h-8 w-8 p-0 flex items-center justify-center border border-dashed border-gray-300 text-gray-400 hover:text-purple-600 hover:border-purple-600"
                    onClick={() => setIsInviteOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className="gap-2 bg-white hover:bg-gray-50 text-gray-700 border-gray-200 shadow-sm"
                onClick={() => setIsInviteOpen(true)}
              >
                <Users className="w-4 h-4" />
                Assign Team
              </Button>
              
              <Button
                variant="ghost"
                className="gap-2 text-gray-500 hover:text-gray-900"
              >
                <Filter className="w-4 h-4" />
                Filter
              </Button>

              <div className="bg-white p-1 rounded-lg border shadow-sm">
                <Tabs value={currentView} onValueChange={onViewChange} className="w-auto">
                  <TabsList className="h-9 p-0 bg-transparent">
                    <TabsTrigger 
                      value="board" 
                      className="px-3 py-1.5 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 text-gray-500 gap-2 rounded-md transition-all"
                    >
                      <LayoutGrid className="w-4 h-4" />
                      Board
                    </TabsTrigger>
                    <TabsTrigger 
                      value="timeline" 
                      className="px-3 py-1.5 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 text-gray-500 gap-2 rounded-md transition-all"
                    >
                      <span className="rotate-90 text-xs font-bold">|||</span>
                      Timeline
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Button 
                onClick={() => setIsNewProjectOpen(true)} 
                className="bg-purple-600 hover:bg-purple-700 text-white gap-2 ml-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                New
              </Button>
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-between">
            <p className="text-gray-500 text-sm italic">Select a project to view details and manage tasks</p>
            <Button 
              onClick={() => setIsNewProjectOpen(true)} 
              className="bg-purple-600 hover:bg-purple-700 text-white gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>
        )}
      </div>

      <NewProjectDialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen} />
      <InviteMembersDialog open={isInviteOpen} onOpenChange={setIsInviteOpen} />
    </div>
  );
}
