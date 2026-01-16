"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Calendar, FileText } from "lucide-react";

const initialCandidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 234-567-8901",
    position: "Senior Frontend Developer",
    stage: "applied",
    appliedDate: "2026-01-12",
    experience: "5 years",
    skills: ["React", "TypeScript", "Next.js"]
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 234-567-8902",
    position: "Senior Frontend Developer",
    stage: "applied",
    appliedDate: "2026-01-11",
    experience: "6 years",
    skills: ["Vue", "JavaScript", "CSS"]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "+1 234-567-8903",
    position: "Product Designer",
    stage: "screening",
    appliedDate: "2026-01-10",
    experience: "4 years",
    skills: ["Figma", "UI/UX", "Prototyping"]
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.k@email.com",
    phone: "+1 234-567-8904",
    position: "DevOps Engineer",
    stage: "interview",
    appliedDate: "2026-01-09",
    experience: "7 years",
    skills: ["AWS", "Docker", "Kubernetes"]
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    phone: "+1 234-567-8905",
    position: "Product Designer",
    stage: "offer",
    appliedDate: "2026-01-08",
    experience: "5 years",
    skills: ["Sketch", "Adobe XD", "Design Systems"]
  }
];

const stages = [
  { id: "applied", label: "Applied", color: "bg-gray-100" },
  { id: "screening", label: "Screening", color: "bg-blue-100" },
  { id: "interview", label: "Interview", color: "bg-yellow-100" },
  { id: "offer", label: "Offer", color: "bg-green-100" },
  { id: "hired", label: "Hired", color: "bg-purple-100" }
];

export default function CandidatePipeline({ onSelectCandidate }) {
  const [candidates, setCandidates] = useState(initialCandidates);

  const getCandidatesByStage = (stageId) => {
    return candidates.filter(c => c.stage === stageId);
  };

  const handleDragStart = (e, candidateId) => {
    e.dataTransfer.setData('candidateId', candidateId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStage) => {
    e.preventDefault();
    const candidateId = parseInt(e.dataTransfer.getData('candidateId'));
    setCandidates(candidates.map(c => 
      c.id === candidateId ? { ...c, stage: newStage } : c
    ));
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => (
        <div 
          key={stage.id}
          className="flex-shrink-0 w-80"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, stage.id)}
        >
          <Card className={`${stage.color} border-2`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center justify-between">
                <span>{stage.label}</span>
                <Badge variant="secondary" className="ml-2">
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
                  className="cursor-move hover:shadow-md transition-shadow bg-white"
                  onClick={() => onSelectCandidate(candidate)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar>
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 truncate">
                          {candidate.name}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">{candidate.position}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{candidate.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>Applied {candidate.appliedDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {candidate.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
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
