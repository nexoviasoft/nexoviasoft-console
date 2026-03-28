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

import JobForm from "@/components/admin/recruitment/JobForm";

export default function RecruitmentPage() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [view, setView] = useState("list"); // 'list', 'details', 'create', 'edit'

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleBackToPipeline = () => {
    setSelectedCandidate(null);
  };

  const handleNewJob = () => {
    setView("create");
    setSelectedJob(null);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setView("edit");
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setView("details");
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 sm:px-8 py-4 sm:py-8">
      <div className="mx-auto max-w-[1600px]">
        {view === "list" || view === "candidates" || view === "calendar" ? (
          <RecruitmentHeader 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setActiveTab(tab);
              setView("list");
            }}
            onNewJob={handleNewJob}
          />
        ) : null}

        {activeTab === "jobs" && (
          <>
            {view === "list" && (
              <JobPostings 
                onViewDetails={handleViewDetails}
                onEdit={handleEditJob}
              />
            )}
            
            {view === "details" && selectedJob && (
              <JobDetails 
                job={selectedJob} 
                onBack={() => setView("list")}
                onUpdate={(updatedJob) => {
                  setSelectedJob(updatedJob);
                }}
                onDelete={(id) => {
                  setView("list");
                  setSelectedJob(null);
                }}
                onEdit={() => setView("edit")}
              />
            )}

            {(view === "create" || view === "edit") && (
              <JobForm 
                job={view === "edit" ? selectedJob : null}
                onBack={() => setView(view === "edit" ? "details" : "list")}
                onSaveSuccess={(data) => {
                  setSelectedJob(data);
                  setView("details");
                }}
              />
            )}
          </>
        )}

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
