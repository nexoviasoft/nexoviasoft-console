"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Lock, Share2, Filter, LayoutGrid, Plus } from "lucide-react";
import NewProjectDialog from "./NewProjectDialog";
import InviteMembersDialog from "./InviteMembersDialog";

export default function ProjectHeader({ currentView, onViewChange }) {
  const [isNewProjectOpen, setIsNewProjectOpen] = React.useState(false);
  const [isInviteOpen, setIsInviteOpen] = React.useState(false);

  return (
    <div className="space-y-6 mb-8">
      {/* Breadcrumbs & Title */}
      <div>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Projects</span>
            <span>/</span>
            <span>Landingpages</span>
            <span>/</span>
            <span className="text-gray-900">Dipa Inhouse</span>
            </div>
             <Button onClick={() => setIsNewProjectOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                <Plus className="w-4 h-4" />
                New Project
             </Button>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Crypto Landingpage Project</h1>
          <button className="text-gray-400 hover:text-yellow-400 transition-colors">
            <Star className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Meta Info & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <span>Private Board</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Share2 className="w-4 h-4" />
            <span className="cursor-pointer hover:text-purple-600">Share</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Last update 10 May 2022</span>
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            <span className="text-sm text-gray-500">Members :</span>
            <div className="flex -space-x-2">
               <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
               <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="/avatars/02.png" />
                <AvatarFallback>KM</AvatarFallback>
              </Avatar>
               <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="/avatars/03.png" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                +2
              </div>
            </div>
            <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 rounded-full h-8 w-8 p-0 flex items-center justify-center border-dashed border-gray-300 text-gray-400 hover:text-purple-600 hover:border-purple-600"
                onClick={() => setIsInviteOpen(true)}
            >
              <span className="text-lg leading-none mb-0.5">+</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
             <Filter className="w-4 h-4" />
             <span>Filter</span>
           </button>
           
           <Tabs value={currentView} onValueChange={onViewChange} className="w-auto">
            <TabsList>
              <TabsTrigger value="board" className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                Board
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center gap-2">
                <span className="rotate-90">|||</span>
                Timeline
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <NewProjectDialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen} />
      <InviteMembersDialog open={isInviteOpen} onOpenChange={setIsInviteOpen} />
    </div>
  );
}
