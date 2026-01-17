"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar, 
  Users,
  CheckCircle,
  MoreVertical
} from "lucide-react";
import { toast } from "sonner";

// Mock data for candidates - in real app, filter from global store/context
const mockCandidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    position: "Senior Frontend Developer",
    stage: "Applied",
    appliedDate: "2026-01-12",
    skills: ["React", "TypeScript", "Next.js"]
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    position: "Senior Frontend Developer",
    stage: "Applied",
    appliedDate: "2026-01-11",
    skills: ["Vue", "JavaScript", "CSS"]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    position: "Product Designer",
    stage: "Screening",
    appliedDate: "2026-01-10",
    skills: ["Figma", "UI/UX", "Prototyping"]
  }
];

export default function JobDetails({ job, onBack }) {
  if (!job) return null;

  // Filter candidates matching this job
  const applicants = mockCandidates.filter(c => c.position === job.title);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <Button variant="ghost" onClick={onBack} className="gap-2 hover:bg-white/50">
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </Button>

      <div className="glass-card rounded-xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <Badge variant={job.status === 'Active' ? 'success' : 'secondary'}>
                {job.status}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.department}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.type}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Posted {job.postedDate}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Edit Job</Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="prose max-w-none text-gray-600 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
          <p className="whitespace-pre-line leading-relaxed">
            {job.description || "No description provided."}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Recent Applicants ({applicants.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <Card key={applicant.id} className="cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {applicant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{applicant.name}</p>
                        <p className="text-xs text-gray-500">{applicant.email}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-[10px] px-1.5 h-5">
                            {applicant.stage}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-gray-500 bg-gray-50/50 rounded-lg border border-dashed">
                No applicants found for this position yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
