"use client";

import React, { useState } from "react";
import RecruitmentHeader from "@/components/admin/recruitment/RecruitmentHeader";
import JobPostings from "@/components/admin/recruitment/JobPostings";
import CandidatePipeline from "@/components/admin/recruitment/CandidatePipeline";
import CandidateDetails from "@/components/admin/recruitment/CandidateDetails";
import JobDetails from "@/components/admin/recruitment/JobDetails";
import InterviewScheduler from "@/components/admin/recruitment/InterviewScheduler";

export default function RecruitmentPage() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleBackToPipeline = () => {
    setSelectedCandidate(null);
  };

  return (
    <div className="bg-gray-50 px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <RecruitmentHeader 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
        
  /* ... inside RecruitmentPage ... */
        
        {activeTab === 'jobs' && (
          selectedJob ? (
            <JobDetails 
              job={selectedJob} 
              onBack={() => setSelectedJob(null)}
            />
          ) : (
            <JobPostings onViewDetails={(job) => setSelectedJob(job)} />
          )
        )}
        
        {activeTab === 'candidates' && (
          selectedCandidate ? (
            <CandidateDetails 
              candidate={selectedCandidate} 
              onBack={handleBackToPipeline}
            />
          ) : (
            <CandidatePipeline onSelectCandidate={handleSelectCandidate} />
          )
        )}
        
        {activeTab === 'calendar' && <InterviewScheduler />}
      </div>
    </div>
  );
}
