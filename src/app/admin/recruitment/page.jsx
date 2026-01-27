"use client";

import React, { useState, useRef } from "react";
import RecruitmentHeader from "@/components/admin/recruitment/RecruitmentHeader";
import JobPostings from "@/components/admin/recruitment/JobPostings";
import CandidatePipeline from "@/components/admin/recruitment/CandidatePipeline";
import CandidateDetails from "@/components/admin/recruitment/CandidateDetails";
import JobDetails from "@/components/admin/recruitment/JobDetails";
import InterviewScheduler from "@/components/admin/recruitment/InterviewScheduler";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function RecruitmentPage() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const newJobTriggerRef = useRef(0);

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleBackToPipeline = () => {
    setSelectedCandidate(null);
  };

  const handleNewJob = () => {
    // Trigger the dialog in JobPostings component
    newJobTriggerRef.current += 1;
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 sm:px-8 py-4 sm:py-8">
      <div className="mx-auto max-w-[1600px]">
        <RecruitmentHeader 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          onNewJob={handleNewJob}
        />

        {activeTab === "jobs" &&
          (selectedJob ? (
            <JobDetails 
              job={selectedJob} 
              onBack={() => setSelectedJob(null)}
              onUpdate={(updatedJob) => {
                setSelectedJob(updatedJob);
              }}
              onDelete={(id) => {
                setSelectedJob(null);
              }}
            />
          ) : (
            <JobPostings 
              onViewDetails={(job) => setSelectedJob(job)}
              onNewJob={newJobTriggerRef.current}
            />
          ))}

        {activeTab === "candidates" &&
          (selectedCandidate ? (
            <CandidateDetails
              candidate={selectedCandidate}
              onBack={handleBackToPipeline}
            />
          ) : (
            <CandidatePipeline onSelectCandidate={handleSelectCandidate} />
          ))}

        {activeTab === "calendar" && <InterviewScheduler />}
      </div>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
