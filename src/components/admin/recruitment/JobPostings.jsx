"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Clock, Users, Edit, Eye } from "lucide-react";
import { toast } from "sonner";
import ImageInput from "@/components/input/ImageInput";
import { useUpload } from "@/hooks/useUpload";
import {
  useGetJobPostingsQuery,
  useUpdateJobPostingMutation,
  useDeleteJobPostingMutation,
} from "@/api/admin/recruitment/recruitmentApi";
import { useGetDepartmentsQuery } from "@/api/landing/department/departmentApi";

export default function JobPostings({ onEdit, onViewDetails }) {
  const { data: jobsResponse, isLoading, error } = useGetJobPostingsQuery();
  const jobs = jobsResponse?.data || [];

  if (isLoading) {
    return <div className="text-white/70">Loading job postings...</div>;
  }

  if (error) {
    return <div className="text-red-400">Error loading job postings</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {jobs.map((job) => (
        <Card key={job.id} className="glass-card border-white/20 hover:shadow-lg transition-shadow">
          <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-3">
            {job.imageUrl ? (
              <div className="mb-3 overflow-hidden rounded-lg border border-white/10 bg-black/30">
                <img
                  src={job.imageUrl}
                  alt={`${job.title} image`}
                  className="h-28 w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}
            <div className="flex justify-between items-start mb-2 gap-2">
              <Badge
                variant={job.status === 'Active' ? 'default' : 'secondary'}
                className="bg-[#F58220]/10 text-[#F58220] border-[#F58220]/40 text-[10px] sm:text-xs shrink-0"
              >
                {job.status}
              </Badge>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-white/70 hover:bg-white/10"
                  onClick={() => onEdit && onEdit(job)}
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
            <CardTitle className="text-sm sm:text-lg text-white truncate">{job.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0 space-y-2 sm:space-y-3">
            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">{job.department}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70 col-span-2 sm:col-span-1">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">{job.type}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-[#F58220]">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                {job.applicants || 0} / {job.vacancy || 1} applicants
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewDetails && onViewDetails(job)}
                className="bg-[#F58220] hover:bg-[#F58220]/80 text-black border-none h-7 sm:h-9 text-[10px] sm:text-sm px-2 sm:px-4"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
