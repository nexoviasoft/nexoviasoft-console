"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function RecruitmentHeader({ activeTab, onTabChange, onNewJob }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recruitment</h1>
        <p className="text-gray-500">Manage job postings, candidates, and interviews</p>
      </div>
      
      <div className="flex items-center gap-4">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {activeTab === 'jobs' && (
          <Button onClick={onNewJob} className="bg-purple-600 hover:bg-purple-700 gap-2">
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        )}
      </div>
    </div>
  );
}
