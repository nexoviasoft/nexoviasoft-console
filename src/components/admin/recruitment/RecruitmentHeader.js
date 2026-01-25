"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function RecruitmentHeader({
  activeTab,
  onTabChange,
  onNewJob,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Recruitment</h1>
        <p className="text-sm text-white/70">
          Manage job postings, candidates, and interviews
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
        <Tabs
          value={activeTab}
          onValueChange={onTabChange}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex bg-white/5 border border-white/10">
            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black text-white/70"
            >
              Jobs
            </TabsTrigger>
            <TabsTrigger
              value="candidates"
              className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black text-white/70"
            >
              Candidates
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black text-white/70"
            >
              Calendar
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === "jobs" && (
          <Button
            onClick={onNewJob}
            className="bg-[#EFFC76] hover:bg-[#EFFC76]/80 text-black gap-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        )}
      </div>
    </div>
  );
}
