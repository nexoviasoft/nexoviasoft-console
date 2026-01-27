"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Calendar, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  useGetCandidatesQuery,
  useUpdateCandidateMutation,
} from "@/api/admin/recruitment/recruitmentApi";

const stages = [
  { id: "applied", label: "Applied", color: "bg-white/5 border-white/10" },
  { id: "screening", label: "Screening", color: "bg-white/5 border-white/10" },
  { id: "interview", label: "Interview", color: "bg-white/5 border-white/10" },
  { id: "offer", label: "Offer", color: "bg-white/5 border-white/10" },
  { id: "hired", label: "Hired", color: "bg-white/5 border-white/10" }
];

export default function CandidatePipeline({ onSelectCandidate }) {
  const { data: candidatesResponse, isLoading, error } = useGetCandidatesQuery();
  const [updateCandidate] = useUpdateCandidateMutation();

  const candidates = candidatesResponse?.data || [];

  const getCandidatesByStage = (stageId) => {
    return candidates.filter(c => c.stage === stageId);
  };

  const handleDragStart = (e, candidateId) => {
    e.dataTransfer.setData('candidateId', candidateId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, newStage) => {
    e.preventDefault();
    const candidateId = parseInt(e.dataTransfer.getData('candidateId'));
    const candidate = candidates.find(c => c.id === candidateId);
    
    if (candidate && candidate.stage !== newStage) {
      try {
        await updateCandidate({
          id: candidateId,
          stage: newStage,
        }).unwrap();
        toast.success("Candidate stage updated successfully!");
      } catch (error) {
        toast.error(error?.data?.message || "Failed to update candidate stage");
      }
    }
  };

  if (isLoading) {
    return <div className="text-white/70">Loading candidates...</div>;
  }

  if (error) {
    return <div className="text-red-400">Error loading candidates</div>;
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => (
        <div 
          key={stage.id}
          className="flex-shrink-0 w-80"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, stage.id)}
        >
          <Card className={`glass-card ${stage.color}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center justify-between text-white">
                <span>{stage.label}</span>
                <Badge
                  variant="secondary"
                  className="ml-2 bg-[#EFFC76]/10 text-[#EFFC76] border-[#EFFC76]/40"
                >
                  {getCandidatesByStage(stage.id).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
              {getCandidatesByStage(stage.id).map((candidate) => (
                <Card 
                  key={candidate.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, candidate.id)}
                  className="cursor-move hover:shadow-md transition-shadow bg-white/5 border border-white/10"
                  onClick={() => onSelectCandidate(candidate)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar>
                        <AvatarFallback className="bg-[#EFFC76]/15 text-[#EFFC76]">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-white truncate">
                          {candidate.name}
                        </h4>
                        <p className="text-xs text-white/70 truncate">
                          {candidate.position}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs text-white/70">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{candidate.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>Applied {candidate.appliedDate ? new Date(candidate.appliedDate).toISOString().split('T')[0] : 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {(candidate.skills || []).slice(0, 3).map((skill, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs bg-white/5 border-white/20 text-white/80"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
